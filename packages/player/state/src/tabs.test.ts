import { describe, test, expect } from 'vitest';
import { INIT, TOGGLE_TAB } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './tabs'

describe('tabs', () => {
  test(`it is a reducer function`, () => {
    expect(typeof reducer).toBe('function')
  })

  test(`it sets the initial state on INIT`, () => {
    expect(reducer(undefined, { type: INIT })).toEqual(INITIAL_STATE)
  })

  test(`it toggles a tab on TOGGLE_TAB`, () => {
    expect(reducer(INITIAL_STATE, { type: TOGGLE_TAB, payload: 'shownotes' })).toEqual({
      ...INITIAL_STATE,
      shownotes: true
    })

    expect(
      reducer({ ...INITIAL_STATE, shownotes: true }, { type: TOGGLE_TAB, payload: 'shownotes' })
    ).toEqual(INITIAL_STATE)
  })
})
