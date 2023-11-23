import { takeEvery, put } from 'redux-saga/effects'
import { setQuantiles } from '@podlove/player-actions/quantiles'
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters'
import { backendPlaytime, updatePlaytime, type backendPlaytimePayload } from '@podlove/player-actions/timepiece'
import type { Action } from 'redux-actions'

let time = null

export function* quantilesSaga() {
  yield takeEvery(nextChapter.toString(), resetTime)
  yield takeEvery(previousChapter.toString(), resetTime)
  yield takeEvery(updatePlaytime.toString(), resetTime)
  yield takeEvery(backendPlaytime.toString(), updateQuantiles)
}

export function* updateQuantiles({ payload }: Action<backendPlaytimePayload>) {
  if (!time) {
    time = payload
  }

  yield put(setQuantiles({ start: time, end: payload }))
}

export function resetTime() {
  time = null
}
