import { handleActions } from 'redux-actions/es'
import { propOr, prop } from 'ramda'
import { language } from '@podlove/button-config'

import { INIT, SET_LANGUAGE, SET_RUNTIME, SET_VERSION } from '@podlove/button-actions/types'

export const INITIAL_STATE = {
  language: 'en',
  browser: null,
  locale: null,
  platform: null,
  version: null
}

export const reducer = handleActions(
  {
    [SET_LANGUAGE]: (state, { payload }) => ({
      ...state,
      language: payload
    }),
    [SET_RUNTIME]: (state, { payload }) => ({
      ...state,
      browser: propOr(null, 'browser', payload),
      locale: propOr(null, 'locale', payload),
      platform: propOr(null, 'platform', payload),
      language: propOr(null, 'language', payload)
    }),
    [SET_VERSION]: (state, { payload }) => ({
      ...state,
      version: payload
    }),
    [INIT]: (state, { payload }) => ({
      ...state,
      language: language(payload) || state.language
    })
  },
  INITIAL_STATE
)

export const selectors = {
  language: prop('language'),
  platform: prop('platform'),
  locale: prop('locale'),
  version: prop('version')
}
