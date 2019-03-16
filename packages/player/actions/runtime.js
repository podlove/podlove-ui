import { createAction } from 'redux-actions'

import { SET_LANGUAGE, SET_RUNTIME, SET_VERSION, SET_PLAYBACK_PARAMS } from './types'

export const setLanguage = createAction(SET_LANGUAGE)
export const setRuntime = createAction(SET_RUNTIME)
export const setVersion = createAction(SET_VERSION)
export const setPlaybackParams = createAction(SET_PLAYBACK_PARAMS)
