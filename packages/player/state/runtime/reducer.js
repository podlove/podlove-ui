import { handleActions } from 'redux-actions'
import { propOr } from 'ramda'
import { language } from '@podlove/utils/config'

import {
  INIT,
  SET_LANGUAGE,
  SET_RUNTIME,
  SET_VERSION,
  SET_MODE
} from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  language: 'en',
  browser: null,
  locale: null,
  platform: null,
  version: null,
  mode: 'native'
}

export const reducer = handleActions(
  {
    [SET_LANGUAGE]: (state, { payload }) => ({
      ...state,
      language: payload
    }),
    [SET_RUNTIME]: (state, { payload }) => ({
      ...state,
      display: propOr(null, 'display', payload),
      browser: propOr(null, 'browser', payload),
      locale: propOr(null, 'locale', payload),
      platform: propOr(null, 'platform', payload),
      language: propOr(null, 'language', payload)
    }),
    [SET_VERSION]: (state, { payload }) => ({
      ...state,
      version: payload
    }),
    [SET_MODE]: (state, { payload }) => ({
      ...state,
      mode: ['native', 'embed'].includes(payload) ? payload : state.mode
    }),
    [INIT]: (state, { payload }) => ({
      ...state,
      language: language(payload) || state.language
    })
  },
  INITIAL_STATE
)
