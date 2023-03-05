import { handleActions } from 'redux-actions'

import { SHOW_ERROR, HIDE_ERROR } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  active: false,
  icon: null,
  title: null,
  message: null,
  retry: false
}

export const reducer = handleActions(
  {
    [SHOW_ERROR]: (state, { payload }) => ({
      ...state,
      active: true,
      ...payload
    }),
    [HIDE_ERROR]: () => INITIAL_STATE
  },
  INITIAL_STATE
)
