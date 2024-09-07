import { get } from 'lodash-es';
import { PodloveWebPlayerChapter } from '@podlove/types';

const emptyChapter: PodloveWebPlayerChapter = {
  start: null,
  end: null,
  title: null,
  href: null,
  index: -1
};

export const getChapterByIndex = (chapters: PodloveWebPlayerChapter[], index: number) =>
  get(chapters, index, emptyChapter);

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

export const currentChapterByPlaytime = (
  chapters: PodloveWebPlayerChapter[],
  playtime: number
): PodloveWebPlayerChapter =>
  chapters.find((chapter) => {
    if (playtime < (chapter.start as number)) {
      return false;
    }

    if (playtime >= (chapter.end as number)) {
      return false;
    }

    return true;
  });

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
    if (playtime < (chapter.start as number)) {
      return inactiveChapter(chapter);
    }

    if (playtime >= (chapter.end as number)) {
      return inactiveChapter(chapter);
    }

    return activeChapter(chapter);
  };

export const setActiveByIndex =
  (chapterIndex: number) =>
  (chapter: PodloveWebPlayerChapter, index: number): PodloveWebPlayerChapter =>
    chapterIndex === index ? activeChapter(chapter) : inactiveChapter(chapter);
