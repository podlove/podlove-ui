import { reducer, INITIAL_STATE } from './reducer'

import {
  SIMULATE_PLAYTIME,
  ENABLE_GHOST_MODE,
  DISABLE_GHOST_MODE
} from '@podlove/player-actions/types'

describe('ghost', () => {
  test('should set the ghost time on SIMULATE_PLAYTIME', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          active: false
        },
        {
          type: SIMULATE_PLAYTIME,
          payload: 1337
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      time: null
    })

    expect(
      reducer(
        {
          ...INITIAL_STATE,
          active: true
        },
        {
          type: SIMULATE_PLAYTIME,
          payload: 1337
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      active: true,
      time: 1337
    })
  })

  test('should enable the ghost mode on ENABLE_GHOST_MODE', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          active: false
        },
        {
          type: ENABLE_GHOST_MODE
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      active: true
    })
  })

  test('should enable the ghost mode on DISABLE_GHOST_MODE', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          active: true
        },
        {
          type: DISABLE_GHOST_MODE
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      active: false
    })
  })
})
