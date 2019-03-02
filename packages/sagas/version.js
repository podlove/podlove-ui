import { put } from 'redux-saga/effects'
import { setVersion } from '@podlove/actions/runtime'

export default ({ version }) => function* versionSaga () {
  yield put(setVersion(version))
}
