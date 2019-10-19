import { propOr } from 'ramda'
import { put, takeEvery } from 'redux-saga/effects'
import { INIT } from '@podlove/player-actions/types'
import * as lifecycle from '@podlove/player-actions/lifecycle'
import { json } from '@podlove/utils/request'
import { takeOnce } from './helper'

export function* lifeCycleSaga() {
  yield takeEvery(INIT, ready)
  yield takeOnce(INIT, constructed)
}

export function* ready({ payload }) {
  const [chapters, transcripts] = yield Promise.all([
    json(propOr([], 'chapters', payload)),
    json(propOr([], 'transcripts', payload))
  ])

  // TODO: validate config
  yield put(
    lifecycle.ready({
      ...payload,
      chapters,
      transcripts
    })
  )
}

export function* constructed({ payload }) {
  yield put(lifecycle.constructed(payload))
}
