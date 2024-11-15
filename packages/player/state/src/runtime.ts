import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';
import { language } from '@podlove/player-config';

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
      display: get(payload, 'display', null),
      browser: get(payload, 'browser', null),
      locale: get(payload, 'locale', null),
      platform: get(payload, 'platform', null),
      language: get(payload, 'language', null)
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
  language: (state: State) => get(state, 'language'),
  platform: (state: State) => get(state, 'platform'),
  locale: (state: State) => get(state, 'locale'),
  version: (state: State) => get(state, 'version'),
  mode: (state: State) => get(state, 'mode')
};
