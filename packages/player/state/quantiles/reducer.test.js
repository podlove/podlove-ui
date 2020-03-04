import { LOAD_QUANTILES, SET_QUANTILE } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('quantiles', () => {
  test('it resets quantiles on LOAD_QUANTILES', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: LOAD_QUANTILES,
        payload: [[0, 10]]
      })
    ).toEqual([[0, 10]])
  })

  test('it sets a quantile on SET_QUANTILE', () => {
    expect(
      reducer([[0, 10]], {
        type: SET_QUANTILE,
        payload: {
          start: 11,
          end: 20
        }
      })
    ).toEqual([
      [0, 10],
      [11, 20]
    ])

    expect(
      reducer([[0, 10]], {
        type: SET_QUANTILE,
        payload: {
          start: 0,
          end: 20
        }
      })
    ).toEqual([[0, 20]])
  })
})
