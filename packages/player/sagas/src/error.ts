import { put, takeEvery, delay } from 'redux-saga/effects'
import {
  RETRY_PLAY
} from '@podlove/player-actions/types'
import { showError, hideError, errorMissingMedia, errorConfigMissing } from '@podlove/player-actions/error'
import { requestPlay, requestPause, backendError } from '@podlove/player-actions/play'

export function* errorSaga() {
  yield takeEvery(backendError.toString(), networkError)
  yield takeEvery(RETRY_PLAY, retryPlay)
  yield takeEvery(errorMissingMedia.toString(), configMediaError)
  yield takeEvery(errorConfigMissing.toString(), configMissingError)
}

export function* retryPlay() {
  yield put(hideError())
  yield put(requestPause())
  yield put(requestPlay())
}

export function* networkError() {
  yield delay(1000)
  yield put(
    showError({
      title: 'ERROR.NETWORK.TITLE',
      message: 'ERROR.NETWORK.MESSAGE',
      retry: RETRY_PLAY
    })
  )
}

export function* configMediaError() {
  yield put(
    showError({
      title: 'ERROR.MEDIA.TITLE',
      message: 'ERROR.MEDIA.MESSAGE'
    })
  )
}

export function* configMissingError() {
  yield put(
    showError({
      title: 'ERROR.CONFIG.TITLE',
      message: 'ERROR.CONFIG.MESSAGE'
    })
  )
}
