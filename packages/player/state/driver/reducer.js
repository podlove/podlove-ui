import { handleActions } from 'redux-actions'

import {
  BACKEND_PAUSE,
  BACKEND_PLAY,
  BACKEND_ERROR,
  BACKEND_LOADING_END
} from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  playing: false
}

export const reducer = handleActions(
  {
    [BACKEND_PAUSE]: state => ({
      ...state,
      playing: false
    }),

    [BACKEND_ERROR]: state => ({
      ...state,
      playing: false
    }),
    [BACKEND_PLAY]: state => ({
      ...state,
      playing: true
    }),
    [BACKEND_LOADING_END]: state => ({
      ...state,
      playing: true
    })
  },
  INITIAL_STATE
)
