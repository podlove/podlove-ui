import { propOr, prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';

import {
  backendError,
  backendLoadingEnd,
  backendLoadingEndPayload,
  backendPause,
  backendPlay
} from '@podlove/player-actions/play';

export interface State {
  playing: boolean;
}

export const INITIAL_STATE: State = {
  playing: false
};

export const reducer = handleActions<State, backendLoadingEndPayload>(
  {
    [backendPause.toString()]: (state) => ({
      ...state,
      playing: false
    }),
    [backendError.toString()]: (state) => ({
      ...state,
      playing: false
    }),
    [backendPlay.toString()]: (state) => ({
      ...state,
      playing: true
    }),
    [backendLoadingEnd.toString()]: (state, { payload }: Action<backendLoadingEndPayload>) => ({
      ...state,
      playing: propOr(false, 'playing', payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  playing: prop('playing') as (input: State) => boolean
};
