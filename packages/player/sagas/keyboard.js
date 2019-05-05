import * as keyboard from '@podlove/utils/keyboard'
import { min } from 'ramda'
import { channel, matchAction } from './helper'
import { call, takeEvery, put, select } from 'redux-saga/effects'
import { KEY_DOWN } from '@podlove/player-actions/types'
import { keyUp, keyDown } from '@podlove/player-actions/keyboard'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import * as chapters from '@podlove/player-actions/chapters'
import * as audio from '@podlove/player-actions/audio'

export function* scrubForward(selectPlaytime, selectDuration) {
  const playtime = yield select(selectPlaytime)
  const duration = yield select(selectDuration)

  yield put(requestPlaytime(min(playtime + 2000, duration)))
}

export function* scrubBackward(selectPlaytime) {
  const playtime = yield select(selectPlaytime)
  const time = playtime - 2000

  yield put(requestPlaytime(time < 0 ? 0 : time))
}

export function* playPause(selectPlaystate) {
  const playing = yield select(selectPlaystate)

  if (playing) {
    yield put(requestPause())
  } else {
    yield put(requestPlay())
  }
}

export function* nextChapter() {
  yield put(chapters.nextChapter())
}

export function* previousChapter() {
  yield put(chapters.previousChapter())
}

export const changeVolume = modifier =>
  function*(selectVolume) {
    const volume = yield select(selectVolume)

    yield put(audio.setVolume(parseFloat(volume) + modifier))
  }

export const changeRate = modifier =>
  function*(selectRate) {
    const volume = yield select(selectRate)

    yield put(audio.setRate(parseFloat(volume) + modifier))
  }

export function* mute(selectMuted) {
  const muted = yield select(selectMuted)

  if (muted) {
    yield put(audio.unmute())
  } else {
    yield put(audio.mute())
  }
}

export function* dispatchKeyUp(input) {
  yield put(keyUp(input))
}

export function* dispatchKeyDown(input) {
  yield put(keyDown(input))
}

export const keyboardSaga = ({
  selectPlaytime,
  selectDuration,
  selectPlaystate,
  selectVolume,
  selectRate,
  selectMuted
}) =>
  function* saga() {
    const onKeyDown = yield call(channel, keyboard.keydown)
    const onKeyUp = yield call(channel, keyboard.keyup)

    yield takeEvery(onKeyDown, dispatchKeyDown)
    yield takeEvery(onKeyUp, dispatchKeyUp)

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'right', alt: false, shift: false, meta: false, ctrl: false }),
      scrubForward,
      selectPlaytime,
      selectDuration
    )
    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'right', alt: true, shift: false, meta: false, ctrl: false }),
      nextChapter
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'left', alt: false, shift: false, meta: false, ctrl: false }),
      scrubBackward,
      selectPlaytime
    )
    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'left', alt: true, shift: false, meta: false, ctrl: false }),
      previousChapter
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'space', alt: false, shift: false, meta: false, ctrl: false }),
      playPause,
      selectPlaystate
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'space', alt: false, shift: false, meta: false, ctrl: false }),
      playPause,
      selectPlaystate
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'up', alt: false, shift: true, meta: false, ctrl: false }),
      changeVolume(0.05),
      selectVolume
    )
    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'down', alt: false, shift: true, meta: false, ctrl: false }),
      changeVolume(-0.05),
      selectVolume
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'up', alt: true, shift: false, meta: false, ctrl: false }),
      changeRate(0.05),
      selectRate
    )
    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'down', alt: true, shift: false, meta: false, ctrl: false }),
      changeRate(-0.05),
      selectRate
    )

    yield takeEvery(
      matchAction(KEY_DOWN, { key: 'm', alt: false, shift: false, meta: false, ctrl: false }),
      mute,
      selectMuted
    )
  }
