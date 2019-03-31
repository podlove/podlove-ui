import { takeEvery, select, put } from 'redux-saga/effects'
import { STEP_FORWARD, STEP_BACKWARDS } from '@podlove/player-actions/types'
import { min, max } from 'ramda'
import { requestPlaytime } from '@podlove/player-actions/timepiece'

export default ({ selectDuration, selectPlaytime }) =>
  function* stepperSaga() {
    yield takeEvery(STEP_FORWARD, stepForward)
    yield takeEvery(STEP_BACKWARDS, stepBackward)

    function* stepForward() {
      const duration = yield select(selectDuration)
      const playtime = yield select(selectPlaytime)
      const targetPlaytime = min(playtime + 30 * 1000, duration)
      yield put(requestPlaytime(targetPlaytime))
    }

    function* stepBackward() {
      const playtime = yield select(selectPlaytime)
      const targetPlaytime = max(playtime - 15 * 1000, 0)
      yield put(requestPlaytime(targetPlaytime))
    }
  }
