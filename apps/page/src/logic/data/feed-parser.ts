import { get, castArray, kebabCase } from 'lodash-es';
import { XMLParser } from 'fast-xml-parser';
import { toPlayerTime } from '@podlove/utils/time';
import webVttParser from '@podlove/webvtt-parser';

import type {
  Audio,
  Author,
  Chapter,
  Episode,
  Person,
  Podcast,
  Show,
  Transcript
} from '../../types/feed.types';

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

const getTranscriptUrl = async (data: any): Promise<string | null> => {
  const transcripts: { '@_url': string; '@_type': string }[] = get(
    data,
    ['podcast:transcript'],
    []
  );
  const vtt = transcripts.find((item) => get(item, ['@_type'], null) === 'text/vtt');

  return get(vtt, ['@_url'], null);
};

export const resolveTranscripts = async (transcriptsUrl: string): Promise<Transcript[]> =>
  fetch(transcriptsUrl)
    .then((result) => result.text())
    .then(webVttParser)
    .then((result) => get(result, ['cues'], []))
    .then((cues) =>
      cues.map((cue) => ({
        voice: cue.voice || null,
        speaker: cue.identifier || kebabCase(cue.voice) || null,
        start: cue.start,
        end: cue.end,
        text: cue.text
      }))
    );

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

    return {
      id,
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
      transcripts: id === episodeId && transcriptUrl ? await resolveTranscripts(transcriptUrl) : (transcriptUrl || []),
      audio: transformAudio(data)
    };
  };

const transformAuthor = (data: any): Author => ({
  copyright: get(data, ['channel', 'copyright'], null),
  owner: get(data, ['channel', 'itunes:owner', 'itunes:name'], null),
  name: get(data, ['channel', 'itunes:author'], null),
  mail: get(data, ['channel', 'itunes:owner', 'itunes:email'], null)
});

const transform =
  (episodeId?: number) =>
  async (data: any): Promise<Podcast> => ({
    etag: get(data, 'etag', null),
    buildDate: get(data, ['channel', 'lastBuildDate'], null),
    author: transformAuthor(data),
    show: transformShow(data),
    episodes: await Promise.all(
      castArray(get(data, ['channel', 'item'], [])).map(resolveEpisode(episodeId))
    ).then(episodes => episodes.filter(episode => episode.id !== null)),
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

  return await fetch(feed)
    .then(async (result) => {
      const feedXml = await result.text();
      const etag: string | null = result.headers.get('etag');

      return {
        ...get(parser.parse(feedXml), 'rss', {}),
        etag
      };
    })
    .then(transform(episodeId));
};
