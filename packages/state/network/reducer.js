import { handleActions } from 'redux-actions'

import { BACKEND_BUFFER } from '@podlove/actions/types'

export const INITIAL_STATE = {
  buffer: []
}

export const reducer = handleActions({
  [BACKEND_BUFFER]: (state, { payload }) => ({
    ...state,
    buffer: payload
  })
}, INITIAL_STATE)
