import { handleActions } from 'redux-actions'
import { INIT, SET_DURATION, BACKEND_PLAYTIME, REQUEST_PLAYTIME } from '@podlove/actions/types'
import { toInt } from '@podlove/utils/helper'
import { duration, playtime } from '@podlove/utils/config'

export const INITIAL_STATE = {
  duration: 0,
  playtime: 0
}

export const reducer = handleActions({
  [INIT]: (state, { payload }) => ({
    ...state,
    duration: duration(payload),
    playtime: playtime(payload)
  }),
  [SET_DURATION]: (state, { payload }) => ({
    ...state,
    duration: toInt(payload || state.duration)
  }),
  [BACKEND_PLAYTIME]: (state, { payload }) => ({
    ...state,
    playtime: toInt(payload)
  }),
  [REQUEST_PLAYTIME]: (state, { payload }) => ({
    ...state,
    playtime: toInt(payload)
  })
}, INITIAL_STATE)
