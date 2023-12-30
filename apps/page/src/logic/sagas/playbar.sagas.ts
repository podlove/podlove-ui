import { put, takeEvery, select } from 'redux-saga/effects'
import {
  BACKEND_PLAY,
  BACKEND_PAUSE,
  BACKEND_LOADING_START,
  BACKEND_LOADING_END,
  BACKEND_END
} from '@podlove/player-actions/types'
import { setRate, mute, unmute } from '@podlove/player-actions/audio'

import * as playbar from '~/store/reducers/playbar'

export default ({ selectRate, selectMuted }) => {
  function* play() {
    yield put(playbar.actions.play())
  }

  function* pause() {
    yield put(playbar.actions.pause())
  }

  function* loading() {
    yield put(playbar.actions.loading())
  }

  function* restart() {
    yield put(playbar.actions.restart())
  }

  function* loaded({ payload }) {
    if (payload.paused) {
      yield pause()
    } else {
      yield play()
    }
  }

  function* nextRate() {
    const steps = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0]
    const rate = yield select(selectRate)

    const next = steps.indexOf(rate) + 1

    if (next < steps.length) {
      yield put(setRate(steps[next]))
    } else {
      yield put(setRate(steps[0]))
    }
  }

  function* toggleMute() {
    const muted = yield select(selectMuted)

    yield put(muted ? unmute() : mute())
  }

  return function* () {
    yield takeEvery(BACKEND_PLAY, play)
    yield takeEvery(BACKEND_PAUSE, pause)
    yield takeEvery(BACKEND_LOADING_START, loading)
    yield takeEvery(BACKEND_LOADING_END, loaded)
    yield takeEvery(BACKEND_END, restart)
    yield takeEvery(playbar.types.NEXT_RATE, nextRate)
    yield takeEvery(playbar.types.TOGGLE_MUTE, toggleMute)
  }
}
