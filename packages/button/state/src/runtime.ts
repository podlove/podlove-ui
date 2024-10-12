import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';
import { language } from '@podlove/button-config';
import type { PodloveRuntime } from '@podlove/types';
import {
  setLanguage,
  setLanguagePayload,
  setRuntime,
  setRuntimePayload,
  setVersion,
  setVersionPayload
} from '@podlove/button-actions/runtime';
import { init, initPayload } from '@podlove/button-actions/lifecycle';

export type State = PodloveRuntime;

export const INITIAL_STATE: State = {
  language: 'en',
  browser: null,
  locale: null,
  platform: null,
  version: null
};

export const reducer = handleActions<State, setLanguagePayload | setRuntimePayload | setVersionPayload | initPayload>(
  {
    [setLanguage.toString()]: (state, { payload }: Action<setLanguagePayload>): State => ({
      ...state,
      language: payload
    }),
    [setRuntime.toString()]: (state, { payload }: Action<setRuntimePayload>): State => ({
      ...state,
      browser: get(payload, 'browser', null),
      locale: get(payload, 'locale', null),
      platform: get(payload, 'platform', null),
      language: get(payload, 'language', null)
    }),
    [setVersion.toString()]: (state, { payload }: Action<setVersionPayload>): State => ({
      ...state,
      version: payload
    }),
    [init.toString()]: (state, { payload }: Action<initPayload>): State => ({
      ...state,
      language: language(payload) || state.language
    })
  },
  INITIAL_STATE
);

export const selectors = {
  language: (state: State) => get(state, 'language', null),
  platform: (state: State) => get(state, 'platform', null),
  locale: (state: State) => get(state, 'locale', null),
  version: (state: State) => get(state, 'version', null),
};
