import { put, takeEvery } from 'redux-saga/effects'
import { INIT } from '@podlove/player-actions/types'
import { ready } from '@podlove/player-actions/lifecycle'

export function* lifeCycleSaga() {
  yield takeEvery(INIT, validateConfig)
}

export function* validateConfig() {
  // TODO: validate config
  yield put(ready())
}
