import { get } from 'lodash-es';
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
      playing: get(payload, 'playing', false)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  playing: (state: State) => state.playing
};
