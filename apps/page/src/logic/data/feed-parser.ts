import { get, castArray, kebabCase } from 'lodash-es';
import { XMLParser } from 'fast-xml-parser';
import type {
  Audio,
  Chapter,
  Episode,
  Person,
  Podcast,
  Show,
  Transcript
} from '../../types/feed.types';
import { toPlayerTime } from '@podlove/utils/time';
import { json } from '@podlove/utils/request';
import type { PodloveWebPlayerTranscript } from '@podlove/types';

let CACHE = new Map<string, Promise<Podcast>>();

const parser = new XMLParser({
  ignoreAttributes: false
});

const transformPerson = (input: any): Person => {
  const name = get(input, '#text', null);

  return {
    name: get(input, '#text', null),
    avatar: get(input, '@_img', null),
    id: kebabCase(name)
  };
};

const transformChapter = (input: any): Chapter => ({
  start: toPlayerTime(get(input, ['@_start'], null)),
  title: get(input, ['@_title'], null),
  end: null,
  image: null,
  href: null
});

export const transformTranscript = (input: any): Transcript => {
  const speaker = get(input, ['speaker'], null);

  return {
    speaker: kebabCase(speaker),
    voice: speaker,
    start: get(input, ['startTime'], 0),
    end: get(input, ['endTime'], 0),
    text: get(input, ['body'], '')
  };
};

const buildChapterList =
  (duration: number | null) =>
  (input: Chapter, index: number, list: Chapter[]): Chapter => ({
    ...input,
    end: get(list, [index + 1, 'start'], duration) as number
  });

const transformShow = (data: any): Show => ({
  title: get(data, ['channel', 'title'], null),
  description: get(data, ['channel', 'description'], null),
  link: get(data, ['channel', 'link'], null),
  summary: get(data, ['channel', 'itunes:summary'], null),
  poster: get(data, ['channel', 'image', 'url'], null)
});

const getTranscriptUrl = async (data: any): Promise<string> =>
  get(data, ['podcast:transcript'], []).find(
    (item: { '@_type': string; '@_url': string }) => get(item, '@_type') === 'application/json'
  )?.['@_url'];

const resolveTranscripts = async (transcriptsUrl: string): Promise<Transcript[]> => {
  return json(transcriptsUrl)
    .then((result) => get(result, ['segments'], []))
    .then((items) => items.map(transformTranscript));
};

const transformAudio = (input: any): Audio[] => {
  const url = get(input, ['enclosure', '@_url'], null);
  const size = get(input, ['enclosure', '@_length'], null);
  const mimeType = get(input, ['enclosure', '@_type'], null);

  return [
    {
      url,
      size,
      mimeType
    }
  ];
};

const resolveEpisode =
  (episodeId?: number) =>
  async (data: any): Promise<Episode> => {
    const id = get(data, 'itunes:episode', null);
    const duration = toPlayerTime(get(data, 'itunes:duration', 0));
    const transcriptUrl = await getTranscriptUrl(data);
    // console.log(data);
    return {
      id: get(data, 'itunes:episode', null),
      title: get(data, 'title', null),
      description: get(data, 'description', null),
      subtitle: get(data, 'itunes:subtitle', null),
      link: get(data, 'link', null),
      publicationDate: get(data, 'pubDate', null),
      duration,
      content: get(data, 'content:encoded', null),
      poster: get(data, ['itunes:image', '@_href'], null),
      contributors: castArray(get(data, ['podcast:person'], [])).map(transformPerson),
      chapters: castArray(get(data, ['psc:chapters', 'psc:chapter'], []))
        .map(transformChapter)
        .map(buildChapterList(duration)),
      transcripts: id === episodeId ? await resolveTranscripts(transcriptUrl) : transcriptUrl,
      audio: transformAudio(data)
    };
  };

const transform =
  (episodeId?: number) =>
  async (data: any): Promise<Podcast> => ({
    show: transformShow(data),
    episodes: await Promise.all(
      castArray(get(data, ['channel', 'item'], [])).map(resolveEpisode(episodeId))
    ),
    hosts: castArray(get(data, ['channel', 'podcast:person'], [])).map(transformPerson)
  });

export default async ({
  feed,
  episodeId
}: {
  feed: string | null;
  episodeId?: number;
}): Promise<Podcast> => {
  if (!feed) {
    return transform(episodeId)({});
  }

  // const existing = CACHE.get(feedUrl);

  // if (existing) {
  //   return existing;
  // }

  const result = fetch(feed)
    .then((result) => result.text())
    .then((data) => parser.parse(data))
    .then((data) => get(data, 'rss', {}))
    // .then((data) => {
    //   console.log(data);
    //   return data;
    // })
    .then(transform(episodeId));

  // CACHE.set(feedUrl, result);

  return await result;
};
