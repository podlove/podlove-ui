import { prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { READY } from '@podlove/player-actions/types';
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
};

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
  share: prop('share') as (input: State) => string,
  config: prop('config') as (input: State) => string,
  episode: prop('episode') as (input: State) => string,
  origin: prop('origin') as (input: State) => string
};
