import { handleActions } from 'redux-actions'
import {
  SIMULATE_PLAYTIME,
  ENABLE_GHOST_MODE,
  DISABLE_GHOST_MODE
} from '@podlove/player-actions/types'
import { toInt } from '@podlove/utils/helper'

export const INITIAL_STATE = {
  active: false,
  time: null
}

export const reducer = handleActions(
  {
    [SIMULATE_PLAYTIME]: (state, { payload }) => ({
      ...state,
      time: state.active ? toInt(payload) : null
    }),

    [ENABLE_GHOST_MODE]: state => {
      return {
        ...state,
        active: true
      }
    },

    [DISABLE_GHOST_MODE]: state => ({
      ...state,
      active: false,
      time: null
    })
  },
  INITIAL_STATE
)
