import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import { RETRY_PLAY, BACKEND_ERROR, ERROR_CONFIG_MEDIA } from '@podlove/player-actions/types'
import { showError, hideError } from '@podlove/player-actions/error'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

export function* errorSaga() {
  yield takeEvery(BACKEND_ERROR, networkError)
  yield takeEvery(RETRY_PLAY, retryPlay)
  yield takeEvery(ERROR_CONFIG_MEDIA, configMediaError)
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
      icon: 'missing-connection',
      retry: RETRY_PLAY
    })
  )
}

export function* configMediaError() {
  yield put(
    showError({
      title: 'ERROR.MEDIA.TITLE',
      message: 'ERROR.MEDIA.MESSAGE',
      icon: 'invalid-configuration'
    })
  )
}
