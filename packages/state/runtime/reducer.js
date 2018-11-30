import { handleActions } from 'redux-actions'

import { INIT, SET_LANGUAGE, SET_RUNTIME } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  language: 'en',
  display: 'native',
  browser: null,
  locale: null,
  platform: null
}

export const reducer = handleActions({
  [INIT]: (state, { payload }) => ({
    ...state,
    ...payload.runtime
  }),
  [SET_LANGUAGE]: (state, { payload }) => ({
    ...state,
    language: payload
  }),
  [SET_RUNTIME]: (state, { payload }) => ({
    ...state,
    ...payload
  })
}, INITIAL_STATE)
