import { get } from 'lodash-es';
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
  overlay: (state: State) => get(state, 'install', null),
  finish: (state: State) => get(state, 'title', null),
  icon: (state: State) => get(state, 'icon', null),
  link: (state: State) => get(state, 'link', null),
  os: (state: State) => get(state, 'os', null),
  rss: (state: State) => get(state, 'rss', null),
  type: (state: State) => get(state, 'type', null),
  install: (state: State) => get(state, 'install', null),
};
