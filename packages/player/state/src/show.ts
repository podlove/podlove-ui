import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { sanitize } from '@podlove/utils/dom';
import { createObject } from '@podlove/utils/helper';
import { PodloveWebPlayerConfig } from '@podlove/types';

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

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,
      title: get(payload, ['show', 'title'], null),
      subtitle: get(payload, ['show', 'subtitle'], null),
      summary: sanitize(get(payload, ['show', 'summary'], null)).innerHTML,
      link: get(payload, ['show', 'link'], null),
      poster: get(payload, ['show', 'poster'], null)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  title: (state: State) => state.title,
  subtitle: (state: State) => state.subtitle,
  summary: (state: State) => state.summary,
  link: (state: State) => state.link,
  poster: (state: State) => state.poster
};
