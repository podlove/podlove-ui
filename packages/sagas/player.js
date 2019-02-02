import { audio, events as audioEvents, actions as audioActions } from '@podlove/html5-audio-driver'
import { attatchStream } from '@podlove/html5-audio-driver/hls'
import { takeEvery, select, call, put } from 'redux-saga/effects'
import { REQUEST_PLAY, REQUEST_PAUSE, READY, REQUEST_RESTART, REQUEST_PLAYTIME, SET_RATE, SET_VOLUME, MUTE, UNMUTE, REQUEST_LOAD } from '@podlove/actions/types'
import { backendPlay, backendPause, backendEnd, backendLoadingStart, backendLoadingEnd, backendBuffer, backendError } from '@podlove/actions/play'
import { backendPlaytime, backendDuration } from '@podlove/actions/timepiece'
import { millisecondsToSeconds, secondsToMilliseconds } from '@podlove/utils/time'

import { channel } from './helper'

export default ({ selectMedia, selectPlaytime }) => function* playerSaga () {
  yield takeEvery(READY, initPlayer)

  function* initPlayer () {
    const mediaFiles = yield select(selectMedia)

    if (mediaFiles.length === 0) {
      throw new Error('Missing media files in configuration')
    }

    const mediaElement = attatchStream(audio(mediaFiles))

    const actions = audioActions(mediaElement)
    yield takeEvery(REQUEST_PLAY, play, actions)
    yield takeEvery(REQUEST_PAUSE, pause, actions)
    yield takeEvery(REQUEST_RESTART, restart, actions)
    yield takeEvery(REQUEST_LOAD, load, actions)
    yield takeEvery(REQUEST_PLAYTIME, playtime, actions)
    yield takeEvery(SET_RATE, rate, actions)
    yield takeEvery(SET_VOLUME, volume, actions)
    yield takeEvery(MUTE, mute, actions)
    yield takeEvery(UNMUTE, unmute, actions)

    const events = audioEvents(mediaElement)
    const readyEvent = yield call(channel, events.onReady)
    const playEvent = yield call(channel, events.onPlay)
    const pauseEvent = yield call(channel, events.onPause)
    const endEvent = yield call(channel, events.onEnd)
    const playtimeEvent = yield call(channel, events.onPlaytimeUpdate)
    const bufferingEvent = yield call(channel, events.onBuffering)
    const durationEvent = yield call(channel, events.onDurationChange)
    const bufferChangeEvent = yield call(channel, events.onBufferChange)
    const errorEvent = yield call(channel, events.onError)

    yield takeEvery(readyEvent, onReady)
    yield takeEvery(playEvent, onPlay)
    yield takeEvery(pauseEvent, onPause)
    yield takeEvery(endEvent, onEnd)
    yield takeEvery(playtimeEvent, onPlaytimeUpdate)
    yield takeEvery(durationEvent, onDurationChange)
    yield takeEvery(bufferChangeEvent, onBufferChange)
    yield takeEvery(bufferingEvent, onBuffering)
    yield takeEvery(errorEvent, onError)
  }

  // Actions
  function* play (actions) {
    const playtime = yield select(selectPlaytime)
    actions.setPlaytime(millisecondsToSeconds(playtime))
    actions.play()
  }

  function* pause (actions) {
    actions.pause()
  }

  function* restart (actions) {
    actions.play()
    actions.restart()
  }

  function* load (actions) {
    actions.load()
  }

  function* playtime (actions, { payload }) {
    actions.setPlaytime(millisecondsToSeconds(payload))
  }

  function* rate (actions, { payload }) {
    actions.setRate(payload)
  }

  function* volume (actions, { payload }) {
    actions.setVolume(payload)
  }

  function* mute (actions) {
    actions.mute()
  }

  function* unmute (actions) {
    actions.unmute()
  }

  // Events
  function* onReady () {
    yield put(backendLoadingEnd())
  }

  function* onPlay () {
    yield put(backendPlay())
  }

  function* onPause () {
    yield put(backendPause())
  }

  function* onEnd () {
    yield put(backendEnd())
  }

  function* onPlaytimeUpdate (playtime) {
    const action = backendPlaytime(secondsToMilliseconds(playtime))
    yield put(action)
  }

  function* onDurationChange (duration) {
    const action = backendDuration(secondsToMilliseconds(duration))
    yield put(action)
  }

  function* onBuffering () {
    yield put(backendLoadingStart())
  }

  function* onBufferChange (buffers = []) {
    const payload = buffers.map(([start, stop]) => [secondsToMilliseconds(start), secondsToMilliseconds(stop)])
    yield put(backendBuffer(payload))
  }

  function* onError (type) {
    yield put(backendError(type))
  }
}
