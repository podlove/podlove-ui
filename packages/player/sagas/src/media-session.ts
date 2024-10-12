/* global MediaMetadata */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import * as media from '@podlove/player-actions/play';
import * as timepiece from '@podlove/player-actions/timepiece';
import * as chapters from '@podlove/player-actions/chapters';
import { ready } from '@podlove/player-actions/lifecycle';
import { channel, mediaControl } from './helper.js';
import { max, min } from 'lodash-es';

export const mediaSessionSaga = ({
  selectPoster,
  selectTitle,
  selectShow,
  selectPlaytime,
  selectDuration,
  selectChapterTitle
}: {
  selectPoster: (input: any) => string;
  selectTitle: (input: any) => string;
  selectShow: (input: any) => string;
  selectPlaytime: (input: any) => number;
  selectDuration: (input: any) => number;
  selectChapterTitle: (input: any) => string;
}) =>
  function* saga() {
    if (!navigator.mediaSession) {
      return;
    }

    yield takeEvery(ready.toString(), setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    });
    yield takeEvery(chapters.updateChapter.toString(), setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    });
    yield takeEvery(chapters.setChapter.toString(), setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    });

    const playEvent = yield call(channel, mediaControl('play'));
    const pauseEvent = yield call(channel, mediaControl('pause'));
    const stepBackwardEvent = yield call(channel, mediaControl('seekbackward'));
    const stepForwardEvent = yield call(channel, mediaControl('seekforward'));
    const previousChapterEvent = yield call(channel, mediaControl('previoustrack'));
    const nextChapterEvent = yield call(channel, mediaControl('nexttrack'));

    yield takeEvery(playEvent, play);
    yield takeEvery(pauseEvent, pause);
    yield takeEvery(stepBackwardEvent, stepBackward, { selectPlaytime });
    yield takeEvery(stepForwardEvent, stepForward, { selectPlaytime, selectDuration });
    yield takeEvery(previousChapterEvent, previousChapter);
    yield takeEvery(nextChapterEvent, nextChapter);
  };

export function* setMetadata({
  selectPoster,
  selectTitle,
  selectShow,
  selectChapterTitle
}: {
  selectPoster: (input: any) => string;
  selectTitle: (input: any) => string;
  selectShow: (input: any) => string;
  selectChapterTitle: (input: any) => string;
}) {
  const cover: string = yield select(selectPoster);
  const title: string = yield select(selectTitle);
  const show: string = yield select(selectShow);
  const chapterTitle: string = yield select(selectChapterTitle);

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    album: chapterTitle,
    artist: show,
    artwork: [{ src: cover }]
  });
}

/////
export function* play() {
  yield put(media.requestPlay());
}

export function* pause() {
  yield put(media.requestPause());
}

export function* stepForward({
  selectPlaytime,
  selectDuration
}: {
  selectPlaytime: (input: any) => number;
  selectDuration: (input: any) => number;
}) {
  const playtime: number = yield select(selectPlaytime);
  const duration: number = yield select(selectDuration);

  yield put(timepiece.requestPlaytime(min([playtime + 30000, duration])));
}

export function* stepBackward({ selectPlaytime }: { selectPlaytime: (input: any) => number }) {
  const playtime: number = yield select(selectPlaytime);

  yield put(timepiece.requestPlaytime(max([playtime - 15000, 0])));
}

export function* nextChapter() {
  yield put(chapters.nextChapter());
}

export function* previousChapter() {
  yield put(chapters.previousChapter());
}
