import { INIT, TOGGLE_TAB } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('tabs', () => {
  test(`it is a reducer function`, () => {
    expect(typeof reducer).toBe('function')
  })

  test(`it sets the initial state on INIT`, () => {
    expect(reducer(undefined, { type: INIT })).toEqual(INITIAL_STATE)
  })

  test(`it toggles a tab on TOGGLE_TAB`, () => {
    expect(reducer(INITIAL_STATE, { type: TOGGLE_TAB, payload: 'info' })).toEqual({
      ...INITIAL_STATE,
      info: true
    })

    expect(
      reducer({ ...INITIAL_STATE, info: true }, { type: TOGGLE_TAB, payload: 'info' })
    ).toEqual(INITIAL_STATE)
  })
})
