import { createAction, handleActions, type Action } from 'redux-actions';
import { etag } from '../../../lib/caching.js';
import type { Podcast } from '../../../types/feed.types.js';
import { version } from '../../../../package.json';

export interface State {
  initialized: boolean;
  locale: string;
  cacheKey : string | null;
}

export interface initializeAppPayload {
  feed: string;
  locale: string;
  episodeId?: number;
}

export type dataFetchedPayload = Podcast;

export const actions = {
  initializeApp: createAction<initializeAppPayload>('INITIALIZE'),
  initializeEpisode: createAction<initializeAppPayload>('INITIALIZE_EPISODE'),
  dataFetched: createAction<dataFetchedPayload>('DATA_FETCHED')
};

export const reducer = handleActions<State, any>(
  {
    [actions.initializeApp.toString()]: (state, { payload}: Action<initializeAppPayload>) => ({
      ...state,
      initialized: false,
      locale: payload.locale
    }),
    [actions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => ({
      ...state,
      initialized: true,
      cacheKey: payload.etag ? etag({
        feed: payload.etag,
        version
      }) : null
    })
  },
  { initialized: false, locale: 'en-US', cacheKey: null }
);

export const selectors = {
  initialized: (state: State) => state.initialized,
  locale: (state: State) => state.locale,
  cacheKey: (state: State) => state.cacheKey,
};
