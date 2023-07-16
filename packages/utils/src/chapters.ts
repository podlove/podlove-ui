import { find, propEq, compose, curry, findIndex, defaultTo, add, prop } from 'ramda';
import { PodloveWebPlayerChapter } from '@podlove/types';
import { fallbackTo } from './helper';

const emptyChapter: PodloveWebPlayerChapter = {
  start: null,
  end: null,
  title: null,
  href: null,
  index: -1
};

export const getChapterByIndex = curry(
  (chapters: PodloveWebPlayerChapter[], index: number): PodloveWebPlayerChapter =>
    index < 0 ? emptyChapter : (prop(index, chapters) as unknown as PodloveWebPlayerChapter)
);

export const currentChapterIndex = compose<any[], PodloveWebPlayerChapter[], number, number>(
  fallbackTo(-1),
  findIndex(propEq('active', true)) as (input: PodloveWebPlayerChapter[]) => number,
  defaultTo([])
);

export const currentChapter = (input: PodloveWebPlayerChapter[] = []): PodloveWebPlayerChapter => {
  const chapter = input.find(chapter => chapter.active)
  return chapter ? chapter : emptyChapter
}

export const nextChapter = (chapters: PodloveWebPlayerChapter[]): PodloveWebPlayerChapter =>
  compose<any[], number, number, PodloveWebPlayerChapter>(
    getChapterByIndex(chapters),
    add(1),
    currentChapterIndex
  )(chapters);

export const previousChapter = (chapters: PodloveWebPlayerChapter[]): PodloveWebPlayerChapter =>
  compose<any[], number, number, PodloveWebPlayerChapter>(
    getChapterByIndex(chapters),
    add(-1),
    currentChapterIndex
  )(chapters);

export const currentChapterByPlaytime = curry(
  (chapters: PodloveWebPlayerChapter[], playtime: number): PodloveWebPlayerChapter =>
    find((chapter: PodloveWebPlayerChapter) => {
      if (playtime < chapter.start) {
        return false;
      }

      if (playtime >= chapter.end) {
        return false;
      }

      return true;
    })(chapters)
);

export const inactiveChapter = (chapter: PodloveWebPlayerChapter): PodloveWebPlayerChapter => ({
  ...chapter,
  active: false
});

export const activeChapter = (chapter: PodloveWebPlayerChapter): PodloveWebPlayerChapter => ({
  ...chapter,
  active: true
});

export const setActiveByPlaytime =
  (playtime: number) =>
  (chapter: PodloveWebPlayerChapter): PodloveWebPlayerChapter => {
    if (playtime < chapter.start) {
      return inactiveChapter(chapter);
    }

    if (playtime >= chapter.end) {
      return inactiveChapter(chapter);
    }

    return activeChapter(chapter);
  };

export const setActiveByIndex =
  (chapterIndex: number) =>
  (chapter: PodloveWebPlayerChapter, index: number): PodloveWebPlayerChapter =>
    chapterIndex === index ? activeChapter(chapter) : inactiveChapter(chapter);
