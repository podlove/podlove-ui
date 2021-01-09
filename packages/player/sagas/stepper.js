import { takeEvery, select, put } from 'redux-saga/effects'
import { STEP_FORWARD, STEP_BACKWARDS } from '@podlove/player-actions/types'
import { min, max } from 'ramda'
import { requestPlaytime } from '@podlove/player-actions/timepiece'

export const stepperSaga = ({ selectDuration, selectPlaytime, selectLivesync }) =>
  function* saga() {
    yield takeEvery(STEP_FORWARD, stepForward, { selectDuration, selectPlaytime, selectLivesync })
    yield takeEvery(STEP_BACKWARDS, stepBackward, { selectPlaytime })
  }

export function* stepForward({ selectDuration, selectPlaytime, selectLivesync }) {
  const duration = yield select(selectDuration)
  const playtime = yield select(selectPlaytime)
  const livesync = yield select(selectLivesync)

  const upperLimit = livesync > 0 ? livesync : duration

  const targetPlaytime = min(playtime + 30 * 1000, upperLimit)
  yield put(requestPlaytime(targetPlaytime))
}

export function* stepBackward({ selectPlaytime }) {
  const playtime = yield select(selectPlaytime)
  const targetPlaytime = max(playtime - 15 * 1000, 0)
  yield put(requestPlaytime(targetPlaytime))
}
