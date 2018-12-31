import { put, takeEvery } from 'redux-saga/effects'
import { INIT } from '@podlove/actions/types'
import { ready } from '@podlove/actions/lifecycle'

export default function* () {
  yield takeEvery(INIT, validateConfig)

  function* validateConfig ({ payload }) {
    // TODO: validate config
    yield put(ready())
  }
}
