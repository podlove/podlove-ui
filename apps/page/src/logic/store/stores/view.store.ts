import { createAction, handleActions, type Action } from 'redux-actions';
import { type dataFetchedPayload, actions as runtimeActions } from './runtime.store.js';

export interface State {
  archive: {
    episodes: number[];
    page: number;
  },
  loading: boolean;
}

export type archiveLoadMorePayload = void;
export type startLoadingPayload = void;
export type stopLoadingPayload = void;

export const actions = {
  archiveLoadMore: createAction<archiveLoadMorePayload>('ARCHIVE_LOAD_MORE'),
  startLoading: createAction<archiveLoadMorePayload>('START_LOADING'),
  stopLoading: createAction<archiveLoadMorePayload>('STOP_LOADING'),
};

export const reducer = handleActions<State, any>(
  {
    [runtimeActions.dataFetched.toString()]: (state, { payload }: Action<dataFetchedPayload>) => ({
      ...state,
     archive: {
      ...state.archive,
      episodes: payload.episodes.map(({ id }) => id)
     }
    }),
    [actions.archiveLoadMore.toString()]: (state) => ({
      ...state,
      archive: {
        ...state.archive,
        page: state.archive.page + 1
       }
    }),
    [actions.startLoading.toString()]: (state) => ({
     ...state,
      loading: true
    }),
    [actions.stopLoading.toString()]: (state) => ({
      ...state,
       loading: false
     })
  },
  { archive: { episodes: [], page: 1 }, loading: false }
);

export const selectors = {
  archiveEpisodesPage: (state: State) => state.archive.page,
  archiveEpisodes: (state: State) => state.archive.episodes,
  loading: (state: State) => state.loading,
};
