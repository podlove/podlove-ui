import { pathOr, compose, prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { sanitize } from '@podlove/utils/dom';
import { createObject } from '@podlove/utils/helper';
import { PodloveWebPlayerConfig } from '@podlove/types';

import { READY } from '@podlove/player-actions/types';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export interface State {
  title: null | string;
  subtitle: null | string;
  summary: null | string;
  poster: null | string;
  link: null | string;
}

export const INITIAL_STATE: State = {
  title: null,
  subtitle: null,
  summary: null,
  poster: null,
  link: null
};

const change = createObject({
  title: pathOr(null, ['show', 'title']),
  subtitle: pathOr(null, ['show', 'subtitle']),
  summary: compose(sanitize, pathOr(null, ['show', 'summary'])),
  link: pathOr(null, ['show', 'link']),
  poster: pathOr(null, ['show', 'poster'])
}) as (input: PodloveWebPlayerConfig) => State;

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,
      ...change(payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  title: prop('title') as (input: State) => string | null,
  subtitle: prop('subtitle') as (input: State) => string | null,
  summary: prop('summary') as (input: State) => string | null,
  link: prop('link') as (input: State) => string | null,
  poster: prop('poster') as (input: State) => string | null
};
