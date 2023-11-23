import { identity } from 'ramda';
import { Action } from 'redux-actions';

export type State = Action<any>;

export const INITIAL_STATE: State = {
  type: null,
  payload: null
};

export const reducer = (_state: State, action: Action<any>): State => action;

export const selectors = {
  lastAction: identity as (input: State) => State
};
