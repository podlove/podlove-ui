import { Action, handleActions } from 'redux-actions';
import { prop } from 'ramda';
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
  { [init.toString()]: (state, { payload }: Action<initPayload>): State => ({ ...state, ...payload }) },
  INIT_STATE
);

export const selectors = {
  color: prop('color') as (input: State) => string,
  cover: prop('cover') as (input: State) => string | null,
  size: prop('size') as (input: State) => 'big',
};
