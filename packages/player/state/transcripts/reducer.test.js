import { INITIAL_STATE, reducer } from './reducer'

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

describe('transcripts', () => {
  test('it sets transcripts on SET_TRANSCRIPTS_TIMELINE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_TRANSCRIPTS_TIMELINE,
        payload: {
          timeline: ['foo', 'bar'],
          hasTranscripts: true
        }
      })
    ).toEqual({
      ...INITIAL_STATE,
      hasTranscripts: true,
      timeline: ['foo', 'bar']
    })
  })

  test('it sets the active item on UPDATE_TRANSCRIPTS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: UPDATE_TRANSCRIPTS,
        payload: { foo: 'bar' }
      })
    ).toEqual({
      ...INITIAL_STATE,
      active: { foo: 'bar' }
    })
  })

  test('it toggles the follow on on TOGGLE_FOLLOW_TRANSCRIPTS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: TOGGLE_FOLLOW_TRANSCRIPTS,
        payload: true
      })
    ).toEqual({
      ...INITIAL_STATE,
      follow: true
    })

    expect(
      reducer(INITIAL_STATE, {
        type: TOGGLE_FOLLOW_TRANSCRIPTS,
        payload: false
      })
    ).toEqual({
      ...INITIAL_STATE,
      follow: false
    })
  })

  test('it updates the search query on SEARCH_TRANSCRIPTS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SEARCH_TRANSCRIPTS,
        payload: 'foo'
      })
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        query: 'foo'
      }
    })
  })

  test('it sets the search results on SET_SEARCH_TRANSCRIPTS_RESULTS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_SEARCH_TRANSCRIPTS_RESULTS,
        payload: ['foo', 'bar']
      })
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        selected: 1,
        results: ['foo', 'bar']
      }
    })

    expect(
      reducer(INITIAL_STATE, {
        type: SET_SEARCH_TRANSCRIPTS_RESULTS,
        payload: []
      })
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        selected: -1,
        results: []
      }
    })
  })

  test('it selects the next search result on NEXT_SEARCH_RESULT', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          search: {
            ...INITIAL_STATE.search,
            selected: 0,
            results: ['foo', 'bar', 'baz']
          }
        },
        {
          type: NEXT_SEARCH_RESULT
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        results: ['foo', 'bar', 'baz'],
        selected: 1
      }
    })

    expect(
      reducer(
        {
          ...INITIAL_STATE,
          search: {
            ...INITIAL_STATE.search,
            selected: 3,
            results: ['foo', 'bar', 'baz']
          }
        },
        {
          type: NEXT_SEARCH_RESULT
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        results: ['foo', 'bar', 'baz'],
        selected: 3
      }
    })
  })

  test('it selects the previous search result on PREVIOUS_SEARCH_RESULT', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          search: {
            ...INITIAL_STATE.search,
            selected: 0,
            results: ['foo', 'bar', 'baz']
          }
        },
        {
          type: PREVIOUS_SEARCH_RESULT
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        results: ['foo', 'bar', 'baz'],
        selected: 1
      }
    })

    expect(
      reducer(
        {
          ...INITIAL_STATE,
          search: {
            ...INITIAL_STATE.search,
            selected: 3,
            results: ['foo', 'bar', 'baz']
          }
        },
        {
          type: PREVIOUS_SEARCH_RESULT
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        results: ['foo', 'bar', 'baz'],
        selected: 2
      }
    })
  })

  test('it resets the search state on RESET_SEARCH_TRANSCRIPTS', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          search: {
            ...INITIAL_STATE.search,
            selected: 0,
            results: ['foo', 'bar', 'baz']
          }
        },
        {
          type: RESET_SEARCH_TRANSCRIPTS
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      search: {
        ...INITIAL_STATE.search,
        results: [],
        selected: -1,
        query: ''
      }
    })
  })
})
