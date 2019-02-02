import { put, takeEvery } from 'redux-saga/effects'
import { BACKEND_PLAY, BACKEND_PAUSE, BACKEND_LOADING_START, BACKEND_LOADING_END } from '@podlove/actions/types'
import { showPlayingButton, showLoadingButton, showPauseButton, showProgressBar, showSteppersControls, showChapterControls } from '@podlove/actions/components'

export default function* () {
  yield takeEvery(BACKEND_PLAY, play)
  yield takeEvery(BACKEND_PAUSE, pause)
  yield takeEvery(BACKEND_LOADING_START, loading)
  yield takeEvery(BACKEND_LOADING_END, loaded)

  function* play () {
    yield put(showPlayingButton())
    yield put(showProgressBar())
    yield put(showSteppersControls())
    yield put(showChapterControls())
  }

  function* pause () {
    yield put(showPauseButton())
  }

  function* loading () {
    yield put(showLoadingButton())
  }

  function* loaded ({ paused }) {
    if (paused) {
      yield put(showPauseButton())
    } else {
      yield put(showPlayingButton())
    }
  }
}
