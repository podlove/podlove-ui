import { READY } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('contributors', () => {
  test('should update the contributors on READY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
        payload: {
          contributors: ['Paul', 'Hans']
        }
      })
    ).toEqual(['Paul', 'Hans'])
  })
})
