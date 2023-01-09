import { createAction } from 'redux-actions/es'

import { SET_LANGUAGE, SET_RUNTIME, SET_VERSION } from './types'

export const setLanguage = createAction(SET_LANGUAGE)
export const setRuntime = createAction(SET_RUNTIME)
export const setVersion = createAction(SET_VERSION)
