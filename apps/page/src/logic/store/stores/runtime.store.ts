import { createAction, handleActions, type Action } from 'redux-actions';
import type { Podcast } from '../../../types/feed.types';

export interface State {
  initialized: boolean;
  locale: string;
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
      locale: payload.locale
    }),
    [actions.dataFetched.toString()]: (state) => ({
      ...state,
      initialized: true
    })
  },
  { initialized: false, locale: 'en-US' }
);

export const selectors = {
  initialized: (state: State) => state.initialized,
  locale: (state: State) => state.locale,
};
