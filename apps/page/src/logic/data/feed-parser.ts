import { get, castArray } from 'lodash-es';
import { XMLParser } from 'fast-xml-parser';
import type { Chapter, Episode, Person, Podcast, Show } from '../../types/feed.types';
import { toPlayerTime } from '@podlove/utils/time';

let CACHE = new Map<string, Promise<Podcast>>();

const parser = new XMLParser({
  ignoreAttributes: false
});

const transformPerson = (input: any): Person => ({
  name: get(input, '#text', null),
  role: get(input, '@_role', null),
  image: get(input, '@_img', null),
  slug: null,
  id: null
});

const transformChapter = (input: any): Chapter => ({
  start: toPlayerTime(get(input, ['@_start'], null)),
  title: get(input, ['@_title'], null),
  end: null,
  image: null,
  href: null
});

const buildChapterList =
  (duration: number | null) =>
  (input: Chapter, index: number, list: Chapter[]): Chapter => ({
    ...input,
    end: get(list, [index + 1, 'start'], duration)
  });

const transformShow = (data: any): Show => ({
  title: get(data, ['channel', 'title'], null),
  description: get(data, ['channel', 'description'], null),
  link: get(data, ['channel', 'link'], null),
  summary: get(data, ['channel', 'itunes:summary'], null),
  image: get(data, ['channel', 'image', 'url'], null)
});

const transformEpisode = (data: any): Episode => {
  const duration = toPlayerTime(get(data, 'itunes:duration', 0));

  return {
    id: get(data, 'itunes:episode', null),
    title: get(data, 'title', null),
    description: get(data, 'description', null),
    subtitle: get(data, 'itunes:subtitle', null),
    publicationDate: get(data, 'pubDate', null),
    duration,
    content: get(data, 'content:encoded', null),
    poster: get(data, ['itunes:image', '@_href'], null),
    contributors: castArray(get(data, ['podcast:person'], [])).map(transformPerson),
    chapters: castArray(get(data, ['psc:chapters', 'psc:chapter'], []))
      .map(transformChapter)
      .map(buildChapterList(duration))
  };
};

const transform = (data: any): Podcast => ({
  show: transformShow(data),
  episodes: castArray(get(data, ['channel', 'item'], [])).map(transformEpisode),
  hosts: castArray(get(data, ['channel', 'podcast:person'], [])).map(transformPerson)
});

export default async (feedUrl: string | null): Promise<Podcast> => {
  if (!feedUrl) {
    return transform({});
  }

  // const existing = CACHE.get(feedUrl);

  // if (existing) {
  //   return existing;
  // }

  const result = fetch(feedUrl)
    .then((result) => result.text())
    .then((data) => parser.parse(data))
    .then((data) => get(data, 'rss', {}))
    // .then((data) => {
    //   console.log(data);
    //   return data;
    // })
    .then(transform);

  // CACHE.set(feedUrl, result);

  return await result;
};
