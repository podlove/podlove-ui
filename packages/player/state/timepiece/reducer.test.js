import {
  READY,
  BACKEND_DURATION,
  BACKEND_PLAYTIME,
  REQUEST_PLAYTIME
} from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('timepiece', () => {
  test('it parses duration and playtime on READY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
        payload: {
          duration: '01:30',
          playtime: '00:10'
        }
      })
    ).toEqual({
      duration: 90000,
      playtime: 10000
    })
  })

  test('it sets the duration on BACKEND_DURATION', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_DURATION,
        payload: 10000
      })
    ).toEqual({
      duration: 10000,
      playtime: 0
    })
  })

  test('it sets the duration on BACKEND_PLAYTIME', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_PLAYTIME,
        payload: 10000
      })
    ).toEqual({
      duration: 0,
      playtime: 10000
    })
  })

  test('it sets the duration on REQUEST_PLAYTIME', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: REQUEST_PLAYTIME,
        payload: 10000
      })
    ).toEqual({
      duration: 0,
      playtime: 10000
    })
  })
})
