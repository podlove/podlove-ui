import type { Action } from 'redux';

export const INITIAL_STATE = {
  type: null,
  payload: null
};

export type State = Action;

export const reducer = (_state = INITIAL_STATE, action: Action) => action;
