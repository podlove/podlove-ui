import { get } from 'lodash-es';
import { createAction, handleActions, type Action } from 'redux-actions';
import type { Podcast } from '../../../types/feed.types.js';

export interface State {
  initialized: boolean;
  locale: string;
  cacheKey : string | null;
  buildDate: string | null;
}

export interface initializeAppPayload {
  feed: string;
  locale: string;
  episodeId?: number
}

export type dataFetchedPayload = {
  data: Podcast,
  cacheKey: string | null;
};

export const actions = {
  initializeApp: createAction<initializeAppPayload>('INITIALIZE'),
  initializeEpisode: createAction<initializeAppPayload>('INITIALIZE_EPISODE'),
  dataFetched: createAction<dataFetchedPayload>('DATA_FETCHED')
};

export const reducer = handleActions<State, any>(
  {
    [actions.initializeApp.toString()]: (state, { payload }: Action<initializeAppPayload>) => ({
      ...state,
      initialized: false,
      locale: payload.locale
    }),
    [actions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => ({
      ...state,
      initialized: true,
      buildDate: get(payload, ['data', 'buildDate'], null),
      cacheKey: get(payload, 'cacheKey', null)
    }),

  },
  { initialized: false, locale: 'en-US', cacheKey: null, buildDate: null }
);

export const selectors = {
  initialized: (state: State) => state.initialized,
  locale: (state: State) => state.locale,
  cacheKey: (state: State) => state.cacheKey,
  buildDate: (state: State) => state.buildDate,
};
