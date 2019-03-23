import { takeEvery, put } from 'redux-saga/effects'
import { BACKEND_PLAYTIME, NEXT_CHAPTER, PREVIOUS_CHAPTER, UPDATE_PLAYTIME } from '@podlove/player-actions/types'
import { setQuantiles } from '@podlove/player-actions/quantiles'

export default function * quantilesSaga () {
  let time = null

  yield takeEvery(NEXT_CHAPTER, resetTime)
  yield takeEvery(PREVIOUS_CHAPTER, resetTime)
  yield takeEvery(UPDATE_PLAYTIME, resetTime)

  yield takeEvery(BACKEND_PLAYTIME, updateQuantiles)

  function * updateQuantiles ({ payload }) {
    if (!time) {
      time = payload
    }

    yield put(setQuantiles({ start: time, end: payload }))
  }

  function resetTime () {
    time = null
  }
}
