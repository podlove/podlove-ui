import { handleActions } from 'redux-actions'

import { BACKEND_PAUSE, BACKEND_PLAY } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  playing: false
}

export const reducer = handleActions(
  {
    [BACKEND_PAUSE]: state => ({
      ...state,
      playing: false
    }),
    [BACKEND_PLAY]: state => ({
      ...state,
      playing: true
    })
  },
  INITIAL_STATE
)
