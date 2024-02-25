import { handleActions, createAction, type Action } from 'redux-actions';
import type { Person } from '../../../types/feed.types';

type showSearchActionPayload = void;
type hideSearchActionPayload = void;
type loadActionPayload = void;
type initializedSearchPayload = 'episodes' | 'contributors' | 'transcripts';
export type searchActionPayload = string;
type setResultsPayload = number;
type selectSearchResultPayload = string | null;
export type selectEpisodePayload = number;

export interface EpisodeResult {
  id: number;
  title: string;
  description: string;
  episodeId: number;
}

export interface TranscriptResult {
  id: string; text: string; speaker: string; episodeId: number; episodeTitle: string;
}

type setEpisodeResultsPayload = EpisodeResult[];
type setTranscriptsResultsPayload = TranscriptResult[];
type setContributorsPayload = Person[];

export const actions = {
  initialize: createAction<initializedSearchPayload>('SEARCH_INITIALIZED'),
  show: createAction<showSearchActionPayload>('SEARCH_SHOW'),
  hide: createAction<hideSearchActionPayload>('SEARCH_HIDE'),
  search: createAction<searchActionPayload>('SEARCH_QUERY'),
  setEpisodeResults: createAction<setEpisodeResultsPayload>('SEARCH_RESULTS_EPISODE'),
  setTranscriptsResults: createAction<setTranscriptsResultsPayload>('SEARCH_RESULTS_TRANSCRIPT'),
  setContributorsResults: createAction<setContributorsPayload>('SEARCH_RESULTS_CONTRIBUTOR'),
  selectSearchResult: createAction<selectSearchResultPayload>('SEARCH_SELECT_RESULT'),
  load: createAction<loadActionPayload>('SEARCH_LOADING'),
  setResults: createAction<setResultsPayload>('SEARCH_RESULTS'),
}

export interface State {
  visible: boolean;
  hasResults: boolean;
  query: string;
  episodes: EpisodeResult[];
  contributors: Person[];
  transcripts: TranscriptResult[];
  selectedResult: null | string;
  initialized: {
    episodes: boolean;
    contributors: boolean;
    transcripts: boolean;
  };
}

export const reducer = handleActions<State, any>(
  {
    [actions.show.toString()]: (state) => ({
      ...state,
      visible: true,
      hasResults: false,
      query: '',
      episodes: [],
      contributors: [],
      transcripts: [],
      selectedResult: null
    }),
    [actions.hide.toString()]: (state) => ({
      ...state,
      visible: false
    }),
    [actions.search.toString()]: (state, { payload }: Action<searchActionPayload>) => ({
      ...state,
      query: payload
    }),
    [actions.setEpisodeResults.toString()]: (state, { payload }: Action<setEpisodeResultsPayload>) => ({
      ...state,
      episodes: payload
    }),
    [actions.setTranscriptsResults.toString()]: (state, { payload }: Action<setTranscriptsResultsPayload>) => ({
      ...state,
      transcripts: payload
    }),
    [actions.setContributorsResults.toString()]: (state, { payload }: Action<setContributorsPayload>) => ({
      ...state,
      contributors: payload
    }),
    [actions.setResults.toString()]: (state, { payload }: Action<setResultsPayload>) => ({
      ...state,
      hasResults: payload > 0
    }),
    [actions.initialize.toString()]: (state, { payload }: Action<initializedSearchPayload>) => ({
      ...state,
      initialized: {
        ...state.initialized,
        [payload]: true
      },
      loading: false
    }),
    [actions.selectSearchResult.toString()]: (state, { payload }: Action<selectSearchResultPayload>) => ({
      ...state,
      selectedResult: payload
    })
  },
  {
    visible: false,
    hasResults: false,
    query: '',
    episodes: [],
    contributors: [],
    transcripts: [],
    selectedResult: null,
    initialized: {
      episodes: false,
      contributors: true,
      transcripts: false,
    }
  }
)

export const selectors = {
  initialized: (state: State) => Object.values(state.initialized).every(Boolean),
  episodesInitialized: (state: State) => state.initialized.episodes,
  transcriptsInitialized: (state: State) => state.initialized.transcripts,
  visible: (state: State) => state.visible,
  query: (state: State) => state.query,
  contributors: (state: State) => state.contributors,
  episodes: (state: State) => state.episodes,
  transcripts: (state: State) => state.transcripts,
  hasResults: (state: State) => state.hasResults,
  selectedResult: (state: State) => state.selectedResult,
  results: (state: State) => [...state.contributors, ...state.episodes, ...state.transcripts]
}
