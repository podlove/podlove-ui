import { Action, handleActions } from 'redux-actions';

import { selectEmbedSize, selectEmbedSizePayload } from '@podlove/player-actions/embed';

export interface State {
  available: string[];
  size: string;
}

export const INITIAL_STATE: State = {
  available: ['250x400', '320x400', '375x400', '600x290', '768x290'],
  size: '320x400'
};

const update = (state: State, payload: string) =>
  state.available.includes(payload) ? payload : state.size;

export const reducer = handleActions<State, selectEmbedSizePayload>(
  {
    [selectEmbedSize.toString()]: (state, { payload }: Action<selectEmbedSizePayload>) => ({
      ...state,
      size: update(state, payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  available: (state: State) => state.available,
  size: (state: State) => state.size
};
