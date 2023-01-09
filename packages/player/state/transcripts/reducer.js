import { handleActions } from 'redux-actions/es'

import {
  SET_TRANSCRIPTS_TIMELINE,
  UPDATE_TRANSCRIPTS,
  TOGGLE_FOLLOW_TRANSCRIPTS,
  SEARCH_TRANSCRIPTS,
  RESET_SEARCH_TRANSCRIPTS,
  SET_SEARCH_TRANSCRIPTS_RESULTS,
  NEXT_SEARCH_RESULT,
  PREVIOUS_SEARCH_RESULT
} from '@podlove/player-actions/types'

export const INITIAL_STATE = {
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
}

export const reducer = handleActions(
  {
    [SET_TRANSCRIPTS_TIMELINE]: (state, { payload }) => ({
      ...state,
      ...payload
    }),

    [UPDATE_TRANSCRIPTS]: (state, { payload }) => ({
      ...state,
      active: payload
    }),

    [TOGGLE_FOLLOW_TRANSCRIPTS]: (state, { payload }) => ({
      ...state,
      follow: payload
    }),

    [SEARCH_TRANSCRIPTS]: (state, { payload }) => ({
      ...state,
      search: {
        ...state.search,
        searching: true,
        selected: -1,
        query: payload
      }
    }),

    [SET_SEARCH_TRANSCRIPTS_RESULTS]: (state, { payload }) => ({
      ...state,
      search: {
        ...state.search,
        searching: false,
        selected: payload.length > 0 ? 1 : -1,
        results: payload
      }
    }),

    [NEXT_SEARCH_RESULT]: (state) => ({
      ...state,
      search: {
        ...state.search,
        selected:
          state.search.selected + 1 > state.search.results.length
            ? state.search.results.length
            : state.search.selected + 1
      }
    }),

    [PREVIOUS_SEARCH_RESULT]: (state) => ({
      ...state,
      search: {
        ...state.search,
        selected: state.search.selected - 1 < 1 ? 1 : state.search.selected - 1
      }
    }),

    [RESET_SEARCH_TRANSCRIPTS]: (state) => ({
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
)
