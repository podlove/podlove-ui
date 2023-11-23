import { createAction } from 'redux-actions'

import { SET_LANGUAGE, SET_RUNTIME, SET_VERSION, SET_MODE } from './types.js'
import type { PodloveRuntime } from '@podlove/types'

export type setLanguagePayload = string;
export type setRuntimePayload = PodloveRuntime;
export type setVersionPayload = string;
export type setModePayload = 'native' | 'embed';

export const setLanguage = createAction<setLanguagePayload>(SET_LANGUAGE)
export const setRuntime = createAction<setRuntimePayload>(SET_RUNTIME)
export const setVersion = createAction<setVersionPayload>(SET_VERSION)
export const setMode = createAction<setModePayload>(SET_MODE)
