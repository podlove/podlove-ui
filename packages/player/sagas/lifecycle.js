import { put, takeEvery } from 'redux-saga/effects'
import { INIT } from '@podlove/player-actions/types'
import { ready } from '@podlove/player-actions/lifecycle'

export default function* () {
  yield takeEvery(INIT, validateConfig)

  function* validateConfig ({ payload }) {
    // TODO: validate config
    yield put(ready())
  }
}
