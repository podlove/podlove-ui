import type { PodloveWebPlayerContributor, PodloveWebPlayerTranscript } from '@podlove/types';
import type { PodloveWebPlayerEpisode } from '@podlove/types';
import { handleActions, createAction, type Action } from 'redux-actions';

type showSearchActionPayload = void;
type hideSearchActionPayload = void;
type loadActionPayload = void;
type initializedSearchPayload = void;
type searchActionPayload = string;
type resultsActionPayload = any[]
type selectSearchResultPayload = number;

export const actions = {
  initializedSearch: createAction<initializedSearchPayload>('SEARCH_INITIALIZED'),
  showSearch: createAction<showSearchActionPayload>('SEARCH_SHOW'),
  hideSearch: createAction<hideSearchActionPayload>('SEARCH_HIDE'),
  search: createAction<searchActionPayload>('SEARCH_QUERY'),
  results: createAction<resultsActionPayload>('SEARCH_RESULTS'),
  selectSearchResult: createAction<selectSearchResultPayload>('SEARCH_SELECT_RESULT'),
  load: createAction<loadActionPayload>('SEARCH_LOADING')
}

export interface State {
  visible: boolean;
  loading: boolean;
  hasResults: boolean;
  query: string;
  episodes: PodloveWebPlayerEpisode[];
  contributors: PodloveWebPlayerContributor[];
  transcripts: PodloveWebPlayerTranscript[];
  selectedResult: null | number;
  initialized: boolean;
}

export const reducer = handleActions<State, any>(
  {
    [actions.showSearch.toString()]: (state) => ({
      ...state,
      visible: true,
      hasResults: false,
      query: '',
      episodes: [],
      contributors: [],
      transcripts: [],
      selectedResult: null
    }),
    [actions.hideSearch.toString()]: (state) => ({
      ...state,
      visible: false
    }),
    [actions.search.toString()]: (state, { payload }: Action<searchActionPayload>) => ({
      ...state,
      query: payload
    }),
    [actions.results.toString()]: (state, { payload }: Action<resultsActionPayload>) => ({
      ...state,
      hasResults: payload.length > 0,
      contributors: payload.filter(({ index }) => index === 'contributor').slice(0, 5),
      episodes: payload.filter(({ index }) => index === 'episode').slice(0, 5),
      transcripts: payload.filter(({ index }) => index === 'transcript').slice(0, 5)
    }),
    [actions.initializedSearch.toString()]: (state) => ({
      ...state,
      initialized: true,
      loading: false
    }),
    [actions.load.toString()]: (state) => ({
      ...state,
      loading: true
    }),
    [actions.selectSearchResult.toString()]: (state, { payload }: Action<selectSearchResultPayload>) => ({
      ...state,
      selectedResult: payload
    })
  },
  {
    visible: false,
    loading: false,
    hasResults: false,
    query: '',
    episodes: [],
    contributors: [],
    transcripts: [],
    selectedResult: null,
    initialized: false
  }
)


export const selectors = {
  initialized: (state: State) => state.initialized,
  loading:(state: State) => state.loading,
  visible: (state: State) => state.visible,
  query: (state: State) => state.query,
  contributors: (state: State) => state.contributors,
  episodes: (state: State) => state.episodes,
  transcripts: (state: State) => state.transcripts,
  hasResults: (state: State) => state.hasResults,
  selectedResult: (state: State) => state.selectedResult,
  results: (state: State) => [...state.contributors, ...state.episodes, ...state.transcripts]
}
