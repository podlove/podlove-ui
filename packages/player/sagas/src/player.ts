import { audio } from '@podlove/media-backend/connect';
import type { MediaActions } from '@podlove/media-backend/types';
import { select, call, put, takeEvery, fork } from 'redux-saga/effects';
import { requestPause } from '@podlove/player-actions/play';
import { requestPlaytime, type backendPlaytimePayload, type requestPlaytimePayload, type backendDurationPayload, type backendLiveSyncPayload } from '@podlove/player-actions/timepiece';
import {
  backendPlay,
  backendPause,
  backendEnd,
  backendLoadingStart,
  backendLoadingEnd,
  backendBuffer,
  backendError
} from '@podlove/player-actions/play';
import { errorMissingMedia } from '@podlove/player-actions/error';
import {
  backendPlaytime,
  backendDuration,
  backendLiveSync
} from '@podlove/player-actions/timepiece';
import { millisecondsToSeconds, secondsToMilliseconds } from '@podlove/utils/time';
import { setAttributes } from '@podlove/utils/dom';
import { ready } from '@podlove/player-actions/lifecycle';
import type { PodloveWebPlayerAudio } from '@podlove/types';

import { setChapter, updateChapter } from '@podlove/player-actions/chapters';
import type { Action } from 'redux-actions';
import { setRate, setVolume, type setRateActionPayload, type setVolumeActionPayload, mute, unmute } from '@podlove/player-actions/audio';
import type { backendLoadingEndPayload } from '@podlove/player-actions/play';
import type { backendBufferPayload } from '@podlove/player-actions/play';
import type { backendErrorPayload } from '@podlove/player-actions/play';
import { requestPlay, requestRestart, requestLoad, requestStop } from '@podlove/player-actions/play';

import { channel } from './helper.js';
import { get } from 'lodash-es';

export const playerSaga = ({
  selectMedia,
  selectPlaytime,
  selectTitle,
  selectPoster,
  mountPoint
}: {
  selectMedia: (input: any) => PodloveWebPlayerAudio[];
  selectPlaytime: (input: any) => number;
  selectTitle: (input: any) => string;
  selectPoster: (input: any) => string;
  mountPoint: HTMLElement
}) =>
  function* saga() {
    const connector = audio(mountPoint);

    yield takeEvery(ready.toString(), initPlayer, {
      selectMedia,
      selectTitle,
      selectPoster,
      connector
    });
    yield takeEvery(updateChapter.toString(), syncAttributes, {
      connector,
      selectTitle,
      selectPoster
    });
    yield takeEvery(setChapter.toString(), syncAttributes, {
      connector,
      selectTitle,
      selectPoster
    });
    yield fork(driver, { selectPlaytime, connector });
  };

export function* initPlayer({
  selectMedia,
  selectTitle,
  selectPoster,
  connector
}: {
  selectMedia: (input: any) => PodloveWebPlayerAudio[];
  selectTitle: (input: any) => string;
  selectPoster: (input: any) => string;
  connector: ReturnType<typeof audio>
}) {
  const mediaFiles = yield select(selectMedia);

  if (mediaFiles.length === 0) {
    yield put(errorMissingMedia());
  }

  connector.load(mediaFiles.map(file => ({
    src: get(file, 'url', null),
    type: get(file, 'mimeType', null),
  })));

  // AudioAttributes
  yield fork(syncAttributes, { connector, selectTitle, selectPoster });
}

// Actions
export function* play(actions: MediaActions, selectPlaytime: (input: any) => number) {
  const playtime = yield select(selectPlaytime);
  actions.setPlaytime(millisecondsToSeconds(playtime));
  yield actions.play();
}

export function* pause(actions: MediaActions) {
  yield actions.pause();
}

export function* restart(actions: MediaActions) {
  actions.setPlaytime(0);
  yield actions.play();
}

export function* load(actions: MediaActions) {
  yield actions.load();
}

export function* playtime(actions: MediaActions, { payload }: Action<requestPlaytimePayload>) {
  yield actions.setPlaytime(millisecondsToSeconds(payload));
}

export function* rate(actions: MediaActions, { payload }: Action<setRateActionPayload>) {
  yield actions.setRate(payload);
}

export function* volume(actions: MediaActions, { payload }: Action<setVolumeActionPayload>) {
  yield actions.setVolume(payload);
}

export function* muteAudio(actions: MediaActions) {
  yield actions.mute();
}

export function* unmuteAudio(actions: MediaActions) {
  yield actions.unmute();
}

// Events
export function* onReady(payload: backendLoadingEndPayload) {
  yield put(backendLoadingEnd(payload));
}

export function* onPlay() {
  yield put(backendPlay());
}

export function* onPause() {
  yield put(backendPause());
}

export function* onEnd() {
  yield put(backendEnd());
}

export function* onPlaytimeUpdate(playtime: backendPlaytimePayload) {
  const action = backendPlaytime(secondsToMilliseconds(playtime));
  yield put(action);
}

export function* onDurationChange(duration: backendDurationPayload) {
  const action = backendDuration(secondsToMilliseconds(duration));
  yield put(action);
}

export function* onLiveSyncUpdate(sync: backendLiveSyncPayload) {
  const action = backendLiveSync(secondsToMilliseconds(sync));
  yield put(action);
}

export function* onBuffering() {
  yield put(backendLoadingStart());
}

export function* onBufferChange(buffers: backendBufferPayload = []) {
  const payload: backendBufferPayload = buffers.map(([start, stop]) => [
    secondsToMilliseconds(start),
    secondsToMilliseconds(stop)
  ]);
  yield put(backendBuffer(payload));
}

export function* onError(type: backendErrorPayload) {
  yield put(backendError(type));
}

export function* onStop() {
  yield put(requestPause());
  yield put(requestPlaytime(0));
}

export function* driver({ selectPlaytime, connector }: { selectPlaytime: (input: any) => number, connector: ReturnType<typeof audio> }) {
  // AudioActions
  yield takeEvery(requestPlay.toString(), play, connector.actions as MediaActions, selectPlaytime);
  yield takeEvery(requestPause.toString(), pause, connector.actions as MediaActions);
  yield takeEvery(requestRestart.toString(), restart, connector.actions as MediaActions);
  yield takeEvery(requestLoad.toString(), load, connector.actions as MediaActions);
  yield takeEvery(requestPlaytime.toString(), playtime, connector.actions as MediaActions);
  yield takeEvery(requestStop.toString(), onStop);
  yield takeEvery(setRate.toString(), rate, connector.actions as MediaActions);
  yield takeEvery(setVolume.toString(), volume, connector.actions as MediaActions);
  yield takeEvery(mute.toString(), muteAudio, connector.actions as MediaActions);
  yield takeEvery(unmute.toString(), unmuteAudio, connector.actions as MediaActions);

  // AudioEvents
  const readyEvent = yield call(channel, connector.events.onReady);
  const playEvent = yield call(channel, connector.events.onPlay);
  const pauseEvent = yield call(channel, connector.events.onPause);
  const endEvent = yield call(channel, connector.events.onEnd);
  const playtimeEvent = yield call(channel, connector.events.onPlaytimeUpdate);
  const durationEvent = yield call(channel, connector.events.onDurationChange);
  const liveSyncEvent = yield call(channel, connector.events.onLiveSyncUpdate);
  const bufferingEvent = yield call(channel, connector.events.onBuffering);
  const bufferChangeEvent = yield call(channel, connector.events.onBufferChange);
  const errorEvent = yield call(channel, connector.events.onError);

  yield takeEvery(readyEvent, onReady);
  yield takeEvery(playEvent, onPlay);
  yield takeEvery(pauseEvent, onPause);
  yield takeEvery(endEvent, onEnd);
  yield takeEvery(playtimeEvent, onPlaytimeUpdate);
  yield takeEvery(durationEvent, onDurationChange);
  yield takeEvery(liveSyncEvent, onLiveSyncUpdate);
  yield takeEvery(bufferChangeEvent, onBufferChange);
  yield takeEvery(bufferingEvent, onBuffering);
  yield takeEvery(errorEvent, onError);

  return connector;
}

// Attribute Bindings
export function* syncAttributes({ connector, selectTitle, selectPoster }:
  { connector: ReturnType<typeof audio>, selectTitle: (input: any) => string, selectPoster: (input: any) => string }) {
  const title = yield select(selectTitle);
  const poster = yield select(selectPoster);

  connector.mediaElement &&
    setAttributes({ title, poster, 'x-webkit-airplay': 'allow' }, connector.mediaElement);
}
