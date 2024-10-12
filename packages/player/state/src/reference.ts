import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import {
  shareReference,
  originReference,
  episodeReference,
  configReference
} from '@podlove/player-config';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export interface State {
  config: string;
  share: string;
  origin: string;
  episode: string;
}

export const INITIAL_STATE: State = {
  config: null,
  share: null,
  origin: null,
  episode: null
};

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (_state, { payload }: Action<readyPayload>) => ({
      episode: episodeReference(payload),
      config: configReference(payload),
      share: shareReference(payload),
      origin: originReference(payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  share: (state: State) => get(state, 'share'),
  config: (state: State) => get(state, 'config'),
  episode: (state: State) => get(state, 'episode'),
  origin: (state: State) => get(state, 'origin')
};
