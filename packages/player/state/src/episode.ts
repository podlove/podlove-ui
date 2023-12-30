import { compose, propOr, prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

import { parseDate } from '@podlove/utils/time';
import { sanitize } from '@podlove/utils/dom';
import { createObject } from '@podlove/utils/helper';
import { PodloveWebPlayerConfig } from '@podlove/types';

export interface State {
  title: string | null;
  subtitle: string | null;
  summary: string | null;
  poster: string | null;
  link: string | null;
  publicationDate: number | null;
}

export const INIT_STATE: State = {
  title: null,
  subtitle: null,
  summary: null,
  poster: null,
  link: null,
  publicationDate: null
};

const update = createObject({
  title: propOr(null, 'title'),
  subtitle: propOr(null, 'subtitle'),
  summary: compose(sanitize, propOr(null, 'summary')),
  link: propOr(null, 'link'),
  poster: propOr(null, 'poster'),
  publicationDate: compose(parseDate, propOr(null, 'publicationDate'))
}) as (input: PodloveWebPlayerConfig) => State;

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,
      ...update(payload)
    })
  },
  INIT_STATE
);

export const selectors = {
  title: prop('title') as (input: State) => string | null,
  subtitle: prop('subtitle') as (input: State) => string | null,
  summary: prop('summary') as (input: State) => string | null,
  link: prop('link') as (input: State) => string | null,
  poster: prop('poster') as (input: State) => string | null,
  publicationDate: prop('publicationDate') as (input: State) => number | null
};
