import { createAction } from 'redux-actions';
import type { PodloveRuntime } from '@podlove/types';

import { SET_LANGUAGE, SET_RUNTIME, SET_VERSION } from './types';

export type setLanguagePayload = string;
export type setRuntimePayload = PodloveRuntime;
export type setVersionPayload = string;

export const setLanguage = createAction<setLanguagePayload>(SET_LANGUAGE);
export const setRuntime = createAction<setRuntimePayload>(SET_RUNTIME);
export const setVersion = createAction<setVersionPayload>(SET_VERSION);
