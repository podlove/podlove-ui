import { handleActions } from 'redux-actions'
import { propOr } from 'ramda'

import { SET_LANGUAGE, SET_RUNTIME, SET_VERSION } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  language: 'en',
  display: 'native',
  browser: null,
  locale: null,
  platform: null,
  version: null
}

export const reducer = handleActions({
  [SET_LANGUAGE]: (state, { payload }) => ({
    ...state,
    language: payload
  }),
  [SET_RUNTIME]: (state, { payload }) => ({
    ...state,
    display: propOr(null, 'display', payload),
    browser: propOr(null, 'browser', payload),
    locale: propOr(null, 'locale', payload),
    platform: propOr(null, 'platform', payload)
  }),
  [SET_VERSION]: (state, { payload }) => ({
    ...state,
    version: payload
  })
}, INITIAL_STATE)
