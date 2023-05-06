import { describe, test, beforeEach, vi, expect } from 'vitest';
import {
  chaptersSaga,
  initChapters,
  chapterUpdate,
  setCurrentChapter,
  resetChapter,
  previousChapter,
  nextChapter
} from './chapters';
import {
  READY,
  REQUEST_PLAYTIME,
  BACKEND_PLAYTIME,
  SET_CHAPTER,
  DISABLE_GHOST_MODE,
  PREVIOUS_CHAPTER,
  NEXT_CHAPTER
} from '@podlove/player-actions/types';
import * as chapter from '@podlove/player-actions/chapters';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { takeEvery, select, put } from 'redux-saga/effects';

describe('chapters', () => {
  let selectDuration, selectPlaytime, selectCurrentChapter, selectChapterList;

  beforeEach(() => {
    selectDuration = vi.fn();
    selectPlaytime = vi.fn();
    selectCurrentChapter = vi.fn();
    selectChapterList = vi.fn();
  });

  describe('chaptersSaga()', () => {
    test('should export a factory', () => {
      expect(
        typeof chaptersSaga({
          selectDuration,
          selectPlaytime,
          selectCurrentChapter,
          selectChapterList
        })
      ).toBe('function');
    });

    test('should return a generator', () => {
      const saga = chaptersSaga({
        selectDuration,
        selectPlaytime,
        selectCurrentChapter,
        selectChapterList
      });
      expect(typeof saga().next).toBe('function');
    });

    test('should register chapter actions', () => {
      const saga = chaptersSaga({
        selectDuration,
        selectPlaytime,
        selectCurrentChapter,
        selectChapterList
      });
      const gen = saga();

      expect(gen.next().value).toEqual(
        takeEvery(READY, initChapters, {
          selectDuration
        })
      );
      expect(gen.next().value).toEqual(takeEvery(REQUEST_PLAYTIME, chapterUpdate));
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PLAYTIME, chapterUpdate));
      expect(gen.next().value).toEqual(
        takeEvery(SET_CHAPTER, setCurrentChapter, {
          selectCurrentChapter
        })
      );
      expect(gen.next().value).toEqual(
        takeEvery(DISABLE_GHOST_MODE, resetChapter, {
          selectPlaytime
        })
      );
      expect(gen.next().value).toEqual(
        takeEvery(PREVIOUS_CHAPTER, previousChapter, {
          selectPlaytime,
          selectCurrentChapter
        })
      );
      expect(gen.next().value).toEqual(
        takeEvery(NEXT_CHAPTER, nextChapter, {
          selectCurrentChapter,
          selectChapterList
        })
      );
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('chapterUpdate()', () => {
    test('should be a generator', () => {
      expect(typeof chapterUpdate({ payload: 'foo' }).next).toBe('function');
    });

    test('should dispatch UPDATE_CHAPTER', () => {
      const gen = chapterUpdate({ payload: 'foo' });
      expect(gen.next().value).toEqual(put(chapter.updateChapter('foo')));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('setCurrentChapter()', () => {
    test('should be a generator', () => {
      expect(typeof setCurrentChapter({ selectCurrentChapter }).next).toBe('function');
    });

    test('should select the current chapter', () => {
      const gen = setCurrentChapter({ selectCurrentChapter });
      expect(gen.next().value).toEqual(select(selectCurrentChapter));
    });

    test('should dispatch REQUEST_PLAYTIME with the current chapter start', () => {
      const gen = setCurrentChapter({ selectCurrentChapter });
      gen.next();
      expect(gen.next({ start: 1337 }).value).toEqual(put(requestPlaytime(1337)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('resetChapter()', () => {
    test('should be a generator', () => {
      expect(typeof resetChapter({ selectPlaytime }).next).toBe('function');
    });

    test('should select the current playtime', () => {
      const gen = resetChapter({ selectPlaytime });
      expect(gen.next().value).toEqual(select(selectPlaytime));
    });

    test('should dispatch UPDATE_CHAPTER with the current playtime', () => {
      const gen = resetChapter({ selectPlaytime });
      gen.next();
      expect(gen.next(1337).value).toEqual(put(chapter.updateChapter(1337)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('previousChapter()', () => {
    test('should be a generator', () => {
      expect(typeof previousChapter({ selectPlaytime, selectCurrentChapter }).next).toBe(
        'function'
      );
    });

    test('should select the current playtime', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      expect(gen.next().value).toEqual(select(selectPlaytime));
    });

    test('should select the current chapter', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      gen.next();
      expect(gen.next().value).toEqual(select(selectCurrentChapter));
    });

    test('should dispatch SET_CHAPTER if the playtime is nearly at chapters start', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      gen.next();
      gen.next(22000);
      expect(gen.next({ start: 21000, index: 3 }).value).toEqual(put(chapter.setChapter(1)));
      expect(gen.next().done).toBeTruthy();
    });

    test('should dispatch SET_CHAPTER if the playtime is way above the chapters start', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      gen.next();
      gen.next(24000);
      expect(gen.next({ start: 20000, index: 4 }).value).toEqual(put(chapter.setChapter(3)));
      expect(gen.next().done).toBeTruthy();
    });

    test('should prevent negative SET_CHAPTER if the playtime is nearly at chapters start', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      gen.next();
      gen.next(22000);
      expect(gen.next({ start: 21000, index: 1 }).value).toEqual(put(chapter.setChapter(0)));
      expect(gen.next().done).toBeTruthy();
    });

    test('should prevent negative SET_CHAPTER if the playtime is way above the chapters start', () => {
      const gen = previousChapter({ selectPlaytime, selectCurrentChapter });
      gen.next();
      gen.next(24000);
      expect(gen.next({ start: 20000, index: 1 }).value).toEqual(put(chapter.setChapter(0)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('nextChapter()', () => {
    test('should be a generator', () => {
      expect(
        typeof nextChapter({
          selectChapterList,
          selectCurrentChapter
        }).next
      ).toBe('function');
    });

    test('should select the chapters list', () => {
      const gen = nextChapter({
        selectChapterList,
        selectCurrentChapter
      });
      expect(gen.next().value).toEqual(select(selectChapterList));
    });

    test('should select the current chapter', () => {
      const gen = nextChapter({
        selectChapterList,
        selectCurrentChapter
      });
      gen.next();
      expect(gen.next().value).toEqual(select(selectCurrentChapter));
    });

    test('should dispatch SET_CHAPTER with the next chapter index', () => {
      const gen = nextChapter({
        selectChapterList,
        selectCurrentChapter
      });
      gen.next();
      gen.next([{ start: 0 }, { start: 10000 }, { start: 20000 }]);
      expect(gen.next({ start: 10000, index: 1 }).value).toEqual(put(chapter.setChapter(1)));
      expect(gen.next().done).toBeTruthy();
    });

    test('should dispatch SET_CHAPTER with the next chapter index', () => {
      const gen = nextChapter({
        selectChapterList,
        selectCurrentChapter
      });
      gen.next();
      gen.next([{ start: 0 }, { start: 10000 }, { start: 20000 }]);
      expect(gen.next({ start: 10000, index: 4 }).value).toEqual(put(chapter.setChapter(2)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('initChapters()', () => {
    const chapters = [
      {
        start: '00:10',
        title: 'chapter-1',
        image: 'chapter-image-1',
        href: 'http://chapter-href-1.bar'
      },
      {
        start: '00:20',
        title: 'chapter-2',
        image: 'chapter-image-2',
        href: 'http://chapter-href-2.bar'
      },
      {
        start: '00:30',
        title: 'chapter-3',
        image: 'chapter-image-3',
        href: 'http://chapter-href-3.bar'
      }
    ];

    test('should be a generator', () => {
      expect(typeof initChapters({ selectDuration }, { payload: { chapters } }).next).toBe(
        'function'
      );
    });

    test('should select the duration', () => {
      const gen = initChapters({ selectDuration }, { payload: { chapters } });
      expect(gen.next().value).toEqual(select(selectDuration));
    });

    test('should dispatch SET_CHAPTERS_LIST with parsed chapters', () => {
      const gen = initChapters({ selectDuration }, { payload: { chapters } });
      gen.next(50000);
      expect(gen.next().value).toEqual(
        put(
          chapter.setChapters([
            {
              end: 20000,
              href: 'http://chapter-href-1.bar',
              image: 'chapter-image-1',
              index: 1,
              linkTitle: 'chapter-href-1.bar',
              start: 10000,
              title: 'chapter-1'
            },
            {
              end: 30000,
              href: 'http://chapter-href-2.bar',
              image: 'chapter-image-2',
              index: 2,
              linkTitle: 'chapter-href-2.bar',
              start: 20000,
              title: 'chapter-2'
            },
            {
              end: 0,
              href: 'http://chapter-href-3.bar',
              image: 'chapter-image-3',
              index: 3,
              linkTitle: 'chapter-href-3.bar',
              start: 30000,
              title: 'chapter-3'
            }
          ])
        )
      );
    });
  });
});
