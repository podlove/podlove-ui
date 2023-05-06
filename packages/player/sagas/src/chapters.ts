import { propOr, prop } from 'ramda';
import { takeEvery, select, put } from 'redux-saga/effects';
import type { Action } from 'redux-actions';

import { ready, type readyPayload } from '@podlove/player-actions/lifecycle'
import * as config from '@podlove/player-config';
import * as chapter from '@podlove/player-actions/chapters';
import { backendPlaytime, requestPlaytime, type requestPlaytimePayload } from '@podlove/player-actions/timepiece';
import { toPlayerTime } from '@podlove/utils/time';
import { hostname } from '@podlove/utils/url';
import type { PodloveWebPlayerChapter } from '@podlove/types'
import { disableGhost } from '@podlove/player-actions/progress'

export const chaptersSaga = ({
  selectDuration,
  selectPlaytime,
  selectCurrentChapter,
  selectChapterList
}: {
  selectDuration: (input: any) => number;
  selectPlaytime: (input: any) => number;
  selectCurrentChapter: (input: any) => PodloveWebPlayerChapter;
  selectChapterList: (input: any) => PodloveWebPlayerChapter[];
}) =>
  function* saga() {
    yield takeEvery(ready.toString(), initChapters, {
      selectDuration
    });
    yield takeEvery(requestPlaytime.toString(), chapterUpdate);
    yield takeEvery(backendPlaytime.toString(), chapterUpdate);
    yield takeEvery(chapter.setChapter.toString(), setCurrentChapter, {
      selectCurrentChapter
    });
    yield takeEvery(disableGhost.toString(), resetChapter, {
      selectPlaytime
    });
    yield takeEvery(chapter.previousChapter.toString(), previousChapter, {
      selectPlaytime,
      selectCurrentChapter
    });
    yield takeEvery(chapter.nextChapter.toString(), nextChapter, {
      selectCurrentChapter,
      selectChapterList
    });
  };

export function* chapterUpdate({ payload }: Action<requestPlaytimePayload>) {
  yield put(chapter.updateChapter(payload));
}

export function* setCurrentChapter({ selectCurrentChapter }: { selectCurrentChapter: (input: any) => PodloveWebPlayerChapter}): any {
  const current: PodloveWebPlayerChapter = yield select(selectCurrentChapter);

  if (!current.start) {
    return;
  }

  yield put(requestPlaytime(current.start));
}

export function* resetChapter({ selectPlaytime }: { selectPlaytime: (input: any) => number }): any {
  const playtime: number = yield select(selectPlaytime);
  yield put(chapter.updateChapter(playtime));
}

export function* previousChapter({ selectPlaytime, selectCurrentChapter }: { selectPlaytime: (input: any) => number, selectCurrentChapter: (input: any) => PodloveWebPlayerChapter }): any {
  const playtime: number = yield select(selectPlaytime);
  const { start, index }: PodloveWebPlayerChapter = yield select(selectCurrentChapter);

  if (!start) {
    return
  }

  if (playtime - start <= 1000) {
    yield put(chapter.setChapter(index - 2 < 0 ? 0 : index - 2));
  } else {
    yield put(chapter.setChapter(index - 1 < 0 ? 0 : index - 1));
  }
}

export function* nextChapter({ selectChapterList, selectCurrentChapter }: { selectChapterList: (input: any) => PodloveWebPlayerChapter[], selectCurrentChapter: (input: any) => PodloveWebPlayerChapter }): any {
  const chapters: PodloveWebPlayerChapter[] = yield select(selectChapterList);
  const { index }: PodloveWebPlayerChapter = yield select(selectCurrentChapter);

  yield put(chapter.setChapter(index > chapters.length - 1 ? chapters.length - 1 : index));
}

export function* initChapters({ selectDuration }: { selectDuration: (input: any) => number }, { payload }: Action<readyPayload>) {
  const chapters = config.chapters(payload);
  const duration: number = yield select(selectDuration);

  const state = chapters.reduce((result: PodloveWebPlayerChapter[], chapter: PodloveWebPlayerChapter, index: number, chapters: PodloveWebPlayerChapter[]) => {
    const end: PodloveWebPlayerChapter = propOr({ start: duration } as PodloveWebPlayerChapter, (index + 1).toString(), chapters);
    const href = (propOr('', 'href', chapter) as string).trim();

    return [
      ...result,
      {
        index: index + 1,
        start: toPlayerTime(chapter?.start || 0),
        end: toPlayerTime(end?.start || 0),
        title: prop('title', chapter),
        image: prop('image', chapter),
        href,
        linkTitle: href ? hostname(href) : null
      }
    ];
  }, []);

  yield put(chapter.setChapters(state));
}
