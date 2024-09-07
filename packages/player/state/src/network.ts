import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { backendBuffer, backendBufferPayload } from '@podlove/player-actions/play';

export interface State {
  buffer: [number, number][];
}

export const INITIAL_STATE: State = {
  buffer: []
};

export const reducer = handleActions<State, backendBufferPayload>(
  {
    [backendBuffer.toString()]: (state, { payload }: Action<backendBufferPayload>) => ({
      ...state,
      buffer: payload
    })
  },
  INITIAL_STATE
);

export const selectors = {
  buffer: (state: State) => get(state, 'buffer', [])
};
