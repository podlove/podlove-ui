import { get } from 'lodash-es';
import { Action, handleActions } from 'redux-actions';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

import { parseDate } from '@podlove/utils/time';
import { sanitize } from '@podlove/utils/dom';

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

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,

      title: get(payload, 'title', null),
      subtitle: get(payload, 'subtitle', null),
      summary: sanitize(get(payload, 'summary', null)),
      link: get(payload, 'link', null),
      poster: get(payload, 'poster', null),
      publicationDate: parseDate(get(payload, 'publicationDate', null))
    })
  },
  INIT_STATE
);

export const selectors = {
  title: (state: State) => state.title,
  subtitle: (state: State) => state.subtitle,
  summary: (state: State) => state.summary,
  link: (state: State) => state.link,
  poster: (state: State) => state.poster,
  publicationDate: (state: State) => state.publicationDate
};
