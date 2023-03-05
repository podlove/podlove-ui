import { handleActions } from 'redux-actions'
import {
  READY,
  BACKEND_DURATION,
  BACKEND_PLAYTIME,
  REQUEST_PLAYTIME,
  BACKEND_LIVESYNC
} from '@podlove/player-actions/types'
import { toInt } from '@podlove/utils/helper'
import { duration, playtime } from '@podlove/player-config'

export const INITIAL_STATE = {
  duration: 0,
  playtime: 0,
  livesync: 0
}

export const reducer = handleActions(
  {
    [READY]: (state, { payload }) => ({
      ...state,
      duration: duration(payload),
      playtime: playtime(payload)
    }),
    [BACKEND_DURATION]: (state, { payload }) => ({
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
    }),
    [BACKEND_LIVESYNC]: (state, { payload }) => ({
      ...state,
      livesync: toInt(payload)
    })
  },
  INITIAL_STATE
)
