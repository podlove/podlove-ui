import { INIT } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('contributors', () => {
  test('should update the contributors on INIT', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: INIT,
        payload: {
          contributors: ['Paul', 'Hans']
        }
      })
    ).toEqual(['Paul', 'Hans'])
  })
})
