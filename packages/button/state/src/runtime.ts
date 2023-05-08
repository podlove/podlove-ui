import { Action, handleActions } from 'redux-actions';
import { propOr, prop } from 'ramda';
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

export const reducer = handleActions(
  {
    [setLanguage.toString()]: (state, { payload }: Action<setLanguagePayload>) => ({
      ...state,
      language: payload
    }),
    [setRuntime.toString()]: (state, { payload }: Action<setRuntimePayload>) => ({
      ...state,
      browser: propOr(null, 'browser', payload),
      locale: propOr(null, 'locale', payload),
      platform: propOr(null, 'platform', payload),
      language: propOr(null, 'language', payload)
    }),
    [setVersion.toString()]: (state, { payload }: Action<setVersionPayload>) => ({
      ...state,
      version: payload
    }),
    [init.toString()]: (state, { payload }: Action<initPayload>) => ({
      ...state,
      language: language(payload) || state.language
    })
  },
  INITIAL_STATE
);

export const selectors = {
  language: prop('language') as (input: State) => string | null,
  platform: prop('platform') as (input: State) => string | null,
  locale: prop('locale') as (input: State) => string | null,
  version: prop('version') as (input: State) => string | null
};
