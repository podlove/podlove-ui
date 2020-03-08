import { audio } from '@podlove/html5-audio-driver/connect'
import { select, call, put, takeEvery, fork } from 'redux-saga/effects'
import {
  REQUEST_PLAY,
  REQUEST_PAUSE,
  READY,
  REQUEST_RESTART,
  REQUEST_PLAYTIME,
  SET_RATE,
  SET_VOLUME,
  MUTE,
  UNMUTE,
  REQUEST_LOAD,
  UPDATE_CHAPTER,
  SET_CHAPTER
} from '@podlove/player-actions/types'
import {
  backendPlay,
  backendPause,
  backendEnd,
  backendLoadingStart,
  backendLoadingEnd,
  backendBuffer,
  backendError
} from '@podlove/player-actions/play'
import { errorMissingMedia } from '@podlove/player-actions/error'
import { backendPlaytime, backendDuration } from '@podlove/player-actions/timepiece'
import { millisecondsToSeconds, secondsToMilliseconds } from '@podlove/utils/time'
import { setAttributes } from '@podlove/utils/dom'

import { channel } from './helper'

export const playerSaga = ({ selectMedia, selectPlaytime, selectTitle, selectPoster }) =>
  function* saga() {
    const connector = audio()

    yield takeEvery(READY, initPlayer, { selectMedia, selectTitle, selectPoster, connector })
    yield takeEvery(UPDATE_CHAPTER, syncAttributes, { connector, selectTitle, selectPoster })
    yield takeEvery(SET_CHAPTER, syncAttributes, { connector, selectTitle, selectPoster })
    yield fork(driver, { selectPlaytime, connector })
  }

export function* initPlayer({ selectMedia, selectTitle, selectPoster, connector }) {
  const mediaFiles = yield select(selectMedia)

  if (mediaFiles.length === 0) {
    yield put(errorMissingMedia())
  }

  connector.load(mediaFiles)

  // AudioAttributes
  yield fork(syncAttributes, { connector, selectTitle, selectPoster })
}

// Actions
export function* play(actions, selectPlaytime) {
  const playtime = yield select(selectPlaytime)
  actions.setPlaytime(millisecondsToSeconds(playtime))
  yield actions.play()
}

export function* pause(actions) {
  yield actions.pause()
}

export function* restart(actions) {
  actions.setPlaytime(0)
  yield actions.play()
}

export function* load(actions) {
  yield actions.load()
}

export function* playtime(actions, { payload }) {
  yield actions.setPlaytime(millisecondsToSeconds(payload))
}

export function* rate(actions, { payload }) {
  yield actions.setRate(payload)
}

export function* volume(actions, { payload }) {
  yield actions.setVolume(payload)
}

export function* mute(actions) {
  yield actions.mute()
}

export function* unmute(actions) {
  yield actions.unmute()
}

// Events
export function* onReady(payload) {
  yield put(backendLoadingEnd(payload))
}

export function* onPlay() {
  yield put(backendPlay())
}

export function* onPause() {
  yield put(backendPause())
}

export function* onEnd() {
  yield put(backendEnd())
}

export function* onPlaytimeUpdate(playtime) {
  const action = backendPlaytime(secondsToMilliseconds(playtime))
  yield put(action)
}

export function* onDurationChange(duration) {
  const action = backendDuration(secondsToMilliseconds(duration))
  yield put(action)
}

export function* onBuffering() {
  yield put(backendLoadingStart())
}

export function* onBufferChange(buffers = []) {
  const payload = buffers.map(([start, stop]) => [
    secondsToMilliseconds(start),
    secondsToMilliseconds(stop)
  ])
  yield put(backendBuffer(payload))
}

export function* onError(type) {
  yield put(backendError(type))
}

export function* driver({ selectPlaytime, connector }) {
  // AudioActions
  yield takeEvery(REQUEST_PLAY, play, connector.actions, selectPlaytime)
  yield takeEvery(REQUEST_PAUSE, pause, connector.actions)
  yield takeEvery(REQUEST_RESTART, restart, connector.actions)
  yield takeEvery(REQUEST_LOAD, load, connector.actions)
  yield takeEvery(REQUEST_PLAYTIME, playtime, connector.actions)
  yield takeEvery(SET_RATE, rate, connector.actions)
  yield takeEvery(SET_VOLUME, volume, connector.actions)
  yield takeEvery(MUTE, mute, connector.actions)
  yield takeEvery(UNMUTE, unmute, connector.actions)

  // AudioEvents
  const readyEvent = yield call(channel, connector.events.onReady)
  const loadedEvent = yield call(channel, connector.events.onLoaded)
  const playEvent = yield call(channel, connector.events.onPlay)
  const pauseEvent = yield call(channel, connector.events.onPause)
  const endEvent = yield call(channel, connector.events.onEnd)
  const playtimeEvent = yield call(channel, connector.events.onPlaytimeUpdate)
  const bufferingEvent = yield call(channel, connector.events.onBuffering)
  const durationEvent = yield call(channel, connector.events.onDurationChange)
  const bufferChangeEvent = yield call(channel, connector.events.onBufferChange)
  const errorEvent = yield call(channel, connector.events.onError)

  yield takeEvery(readyEvent, onReady)
  yield takeEvery(loadedEvent, onReady)
  yield takeEvery(playEvent, onPlay)
  yield takeEvery(pauseEvent, onPause)
  yield takeEvery(endEvent, onEnd)
  yield takeEvery(playtimeEvent, onPlaytimeUpdate)
  yield takeEvery(durationEvent, onDurationChange)
  yield takeEvery(bufferChangeEvent, onBufferChange)
  yield takeEvery(bufferingEvent, onBuffering)
  yield takeEvery(errorEvent, onError)

  return connector
}

// Attribute Bindings
export function* syncAttributes({ connector, selectTitle, selectPoster }) {
  const title = yield select(selectTitle)
  const poster = yield select(selectPoster)

  connector.mediaElement &&
    setAttributes({ title, poster, 'x-webkit-airplay': 'allow' }, connector.mediaElement)
}
