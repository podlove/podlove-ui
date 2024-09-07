import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';
import { init, initPayload } from '@podlove/button-actions/lifecycle';

export const INIT_STATE: State = {
  size: 'big',
  color: '#c90bd6',
  format: 'cover',
  cover: null
};

export interface State {
  size: 'big';
  color: string;
  format: 'cover';
  cover: null | string;
}

export const reducer = handleActions<State, initPayload>(
  {
    [init.toString()]: (state, { payload }: Action<initPayload>): State => ({
      ...state,
      ...payload
    })
  },
  INIT_STATE
);

export const selectors = {
  color: (state: State) => get(state, 'color', null),
  cover: (state: State) => get(state, 'cover', null),
  size: (state: State) => get(state, 'size', null)
};
