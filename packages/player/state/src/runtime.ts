import { Action, handleActions } from 'redux-actions';
import { propOr } from 'ramda';
import { language } from '@podlove/player-config';

import { prop } from 'ramda';
import { setLanguage } from '@podlove/player-actions/runtime';
import { setLanguagePayload } from '@podlove/player-actions/runtime';
import { setRuntime } from '@podlove/player-actions/runtime';
import { setRuntimePayload } from '@podlove/player-actions/runtime';
import { setVersion } from '@podlove/player-actions/runtime';
import { setVersionPayload } from '@podlove/player-actions/runtime';
import { setModePayload } from '@podlove/player-actions/runtime';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';
import { setMode } from '@podlove/player-actions/runtime';

export interface State {
  language: string;
  browser: string | null;
  locale: string | null;
  platform: string | null;
  version: string | null;
  mode: 'embed' | 'native';
}

export const INITIAL_STATE: State = {
  language: 'en',
  browser: null,
  locale: null,
  platform: null,
  version: null,
  mode: 'native'
};

export const reducer = handleActions<
  State,
  setLanguagePayload | setRuntimePayload | setVersionPayload | setModePayload | readyPayload
>(
  {
    [setLanguage.toString()]: (state, { payload }: Action<setLanguagePayload>) => ({
      ...state,
      language: payload
    }),
    [setRuntime.toString()]: (state, { payload }: Action<setRuntimePayload>) => ({
      ...state,
      display: propOr(null, 'display', payload) as unknown as string,
      browser: propOr(null, 'browser', payload) as unknown as string,
      locale: propOr(null, 'locale', payload) as unknown as string,
      platform: propOr(null, 'platform', payload) as unknown as string,
      language: propOr(null, 'language', payload) as unknown as string
    }),
    [setVersion.toString()]: (state, { payload }: Action<setVersionPayload>) => ({
      ...state,
      version: payload
    }),
    [setMode.toString()]: (state, { payload }: Action<setModePayload>) => ({
      ...state,
      mode: ['native', 'embed'].includes(payload) ? payload : state.mode
    }),
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,
      language: language(payload) || state.language
    })
  },
  INITIAL_STATE
);

export const selectors = {
  language: prop('language') as (input: State) => string,
  platform: prop('platform') as (input: State) => string,
  locale: prop('locale') as (input: State) => string,
  version: prop('version') as (input: State) => string,
  mode: prop('mode') as (input: State) => 'embed' | 'native'
};
