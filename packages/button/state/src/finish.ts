import { prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { hide, hidePayload, show } from '@podlove/button-actions/finish-card';
import { showPayload } from '@podlove/button-actions/finish-card';

export interface State {
  icon: string | null;
  install: string | null;
  title: string | null;
  link: string | null;
  os: string | null;
  rss: string | null;
  type: string | null;
}

export const INITIAL_STATE: State = {
  icon: null,
  install: null,
  title: null,
  link: null,
  os: null,
  rss: null,
  type: null
};

export const reducer = handleActions<State, showPayload | hidePayload>(
  {
    [show.toString()]: (_, { payload }: Action<showPayload>): State => payload,
    [hide.toString()]: (): State => INITIAL_STATE
  },
  INITIAL_STATE
);

export const selectors = {
  overlay: prop('install') as (input: State) => string | null,
  finish: prop('title') as (input: State) => string | null,
  icon: prop('icon') as (input: State) => string | null,
  link: prop('link') as (input: State) => string | null,
  os: prop('os') as (input: State) => string | null,
  rss: prop('rss') as (input: State) => string | null,
  type: prop('type') as (input: State) => string | null,
  install: prop('install') as (input: State) => string | null
};
