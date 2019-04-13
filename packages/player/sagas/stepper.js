import { takeEvery, select, put } from 'redux-saga/effects'
import { STEP_FORWARD, STEP_BACKWARDS } from '@podlove/player-actions/types'
import { min, max } from 'ramda'
import { requestPlaytime } from '@podlove/player-actions/timepiece'

export const stepperSaga = ({ selectDuration, selectPlaytime }) =>
  function* saga() {
    yield takeEvery(STEP_FORWARD, stepForward, { selectDuration, selectPlaytime })
    yield takeEvery(STEP_BACKWARDS, stepBackward, { selectPlaytime })
  }

export function* stepForward({ selectDuration, selectPlaytime }) {
  const duration = yield select(selectDuration)
  const playtime = yield select(selectPlaytime)
  const targetPlaytime = min(playtime + 30 * 1000, duration)
  yield put(requestPlaytime(targetPlaytime))
}

export function* stepBackward({ selectPlaytime }) {
  const playtime = yield select(selectPlaytime)
  const targetPlaytime = max(playtime - 15 * 1000, 0)
  yield put(requestPlaytime(targetPlaytime))
}
