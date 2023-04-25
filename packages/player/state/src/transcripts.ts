import { Action, handleActions } from 'redux-actions';
import { compose, prop } from 'ramda';

import {
  PodloveWebPlayerTimelineChapterEntry,
  PodloveWebPlayerTimelineSpeakerEntry
} from '@podlove/types';

import {
  setTranscriptsTimelinePayload,
  updateTranscriptsPayload,
  followTranscriptsPayload,
  searchTranscriptsPayload,
  resetSearchTranscriptionPayload,
  setTranscriptsSearchResultsPayload,
  nextTranscriptsSearchResultPayload,
  previousTranscriptsSearchResultPayload,
  setTranscriptsTimeline,
  updateTranscripts,
  followTranscripts,
  searchTranscripts,
  setTranscriptsSearchResults,
  nextTranscriptsSearchResult,
  previousTranscriptsSearchResult,
  resetSearchTranscription
} from '@podlove/player-actions/transcripts';

export interface State {
  timeline: (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineSpeakerEntry)[];
  active: number | null;
  follow: boolean;
  hasTranscripts: boolean;
  search: {
    searching: boolean;
    query: string;
    selected: number;
    results: number[];
  };
}

export const INITIAL_STATE: State = {
  timeline: [],
  active: null,
  follow: true,
  hasTranscripts: false,
  search: {
    searching: false,
    query: '',
    selected: -1,
    results: []
  }
};

export const reducer = handleActions<
  State,
  | setTranscriptsTimelinePayload
  | updateTranscriptsPayload
  | followTranscriptsPayload
  | searchTranscriptsPayload
  | resetSearchTranscriptionPayload
  | setTranscriptsSearchResultsPayload
  | nextTranscriptsSearchResultPayload
  | previousTranscriptsSearchResultPayload
>(
  {
    [setTranscriptsTimeline.toString()]: (
      state: State,
      { payload }: Action<setTranscriptsTimelinePayload>
    ) => ({
      ...state,
      ...payload
    }),

    [updateTranscripts.toString()]: (
      state: State,
      { payload }: Action<updateTranscriptsPayload>
    ) => ({
      ...state,
      active: payload
    }),

    [followTranscripts.toString()]: (
      state: State,
      { payload }: Action<followTranscriptsPayload>
    ) => ({
      ...state,
      follow: payload
    }),

    [searchTranscripts.toString()]: (
      state: State,
      { payload }: Action<searchTranscriptsPayload>
    ) => ({
      ...state,
      search: {
        ...state.search,
        searching: true,
        selected: -1,
        query: payload
      }
    }),

    [setTranscriptsSearchResults.toString()]: (
      state: State,
      { payload }: Action<setTranscriptsSearchResultsPayload>
    ) => ({
      ...state,
      search: {
        ...state.search,
        searching: false,
        selected: payload.length > 0 ? 1 : -1,
        results: payload
      }
    }),

    [nextTranscriptsSearchResult.toString()]: (state: State) => ({
      ...state,
      search: {
        ...state.search,
        selected:
          state.search.selected + 1 > state.search.results.length
            ? state.search.results.length
            : state.search.selected + 1
      }
    }),

    [previousTranscriptsSearchResult.toString()]: (state: State) => ({
      ...state,
      search: {
        ...state.search,
        selected: state.search.selected - 1 < 1 ? 1 : state.search.selected - 1
      }
    }),

    [resetSearchTranscription.toString()]: (state: State) => ({
      ...state,
      search: {
        ...state.search,
        results: [],
        selected: -1,
        query: ''
      }
    })
  },
  INITIAL_STATE
);

export const selectors = {
  timeline: prop('timeline'),
  active: prop('active'),
  follow: prop('follow'),
  hasTranscripts: prop('hasTranscripts'),
  search: prop('search'),
  searchQuery: compose(prop('query'), prop('search')),
  searchSelected: compose(prop('selected'), prop('search')),
  searchResults: compose(prop('results'), prop('search')),
  searching: compose(prop('searching'), prop('search'))
};
