import { find, curry, propOr } from 'ramda';
import { PodloveWebPlayerChapter } from '@podlove/types';

const emptyChapter: PodloveWebPlayerChapter = {
  start: null,
  end: null,
  title: null,
  href: null,
  index: -1
};

export const getChapterByIndex = curry(
  (chapters: PodloveWebPlayerChapter[], index: number): PodloveWebPlayerChapter =>
    propOr(emptyChapter, index >= 0 ? index : null, chapters)
);

export const currentChapterIndex = (chapters: PodloveWebPlayerChapter[]): number => {
  const index = (chapters || []).findIndex((chapter) => chapter.active);

  if (index >= 0) {
    return index;
  }

  return -1;
};

export const currentChapter = (input: PodloveWebPlayerChapter[] = []): PodloveWebPlayerChapter => {
  const chapter = input.find((chapter) => chapter.active);
  return chapter ? chapter : emptyChapter;
};

export const nextChapter = (chapters: PodloveWebPlayerChapter[]): PodloveWebPlayerChapter => {
  const currentIndex = currentChapterIndex(chapters);
  return getChapterByIndex(chapters, currentIndex >= 0 ? currentIndex + 1 : -1);
};
export const previousChapter = (chapters: PodloveWebPlayerChapter[]): PodloveWebPlayerChapter => {
  const currentIndex = currentChapterIndex(chapters);
  return getChapterByIndex(chapters, currentIndex >= 0 ? currentIndex - 1 : -1);
};

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
