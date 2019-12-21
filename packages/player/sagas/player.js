import {
  events as audioEventFactory,
  actions as audioActionFactory,
  audio
} from '@podlove/html5-audio-driver'
import * as audioActions from '@podlove/html5-audio-driver/actions'
import { attatchStream } from '@podlove/html5-audio-driver/hls'
import { createSourceNodes as sources } from '@podlove/html5-audio-driver/media'
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
    const mediaElement = attatchStream(audio([]))

    yield takeEvery(READY, initPlayer, { selectMedia, selectTitle, selectPoster, mediaElement })
    yield takeEvery(UPDATE_CHAPTER, syncAttributes, { mediaElement, selectTitle, selectPoster })
    yield takeEvery(SET_CHAPTER, syncAttributes, { mediaElement, selectTitle, selectPoster })
    yield fork(driver, { selectPlaytime, mediaElement })
  }

export function* initPlayer({ selectMedia, selectTitle, selectPoster, mediaElement }) {
  const mediaFiles = yield select(selectMedia)

  if (mediaFiles.length === 0) {
    yield put(errorMissingMedia())
  }

  // reset existing media element
  audioActions.pause(mediaElement)
  audioActions.reset(mediaElement)

  // add audio sources
  sources(mediaElement)(mediaFiles)

  // AudioAttributes
  yield fork(syncAttributes, { mediaElement, selectTitle, selectPoster })
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

export function* driver({ selectPlaytime, mediaElement }) {
  // AudioActions
  const actions = audioActionFactory(mediaElement)

  yield takeEvery(REQUEST_PLAY, play, actions, selectPlaytime)
  yield takeEvery(REQUEST_PAUSE, pause, actions)
  yield takeEvery(REQUEST_RESTART, restart, actions)
  yield takeEvery(REQUEST_LOAD, load, actions)
  yield takeEvery(REQUEST_PLAYTIME, playtime, actions)
  yield takeEvery(SET_RATE, rate, actions)
  yield takeEvery(SET_VOLUME, volume, actions)
  yield takeEvery(MUTE, mute, actions)
  yield takeEvery(UNMUTE, unmute, actions)

  // AudioEvents
  const events = audioEventFactory(mediaElement)
  const readyEvent = yield call(channel, events.onReady)
  const loadedEvent = yield call(channel, events.onLoaded)
  const playEvent = yield call(channel, events.onPlay)
  const pauseEvent = yield call(channel, events.onPause)
  const endEvent = yield call(channel, events.onEnd)
  const playtimeEvent = yield call(channel, events.onPlaytimeUpdate)
  const bufferingEvent = yield call(channel, events.onBuffering)
  const durationEvent = yield call(channel, events.onDurationChange)
  const bufferChangeEvent = yield call(channel, events.onBufferChange)
  const errorEvent = yield call(channel, events.onError)

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

  return mediaElement
}

// Attribute Bindings
export function* syncAttributes({ mediaElement, selectTitle, selectPoster }) {
  const title = yield select(selectTitle)
  const poster = yield select(selectPoster)

  setAttributes({ title, poster, 'x-webkit-airplay': 'allow' }, mediaElement)
}
