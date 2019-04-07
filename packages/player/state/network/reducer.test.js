import { BACKEND_BUFFER } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('network', () => {
  test('it sets the buffer on BACKEND_BUFFER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_BUFFER,
        payload: [[0, 10]]
      })
    ).toEqual({
      buffer: [[0, 10]]
    })
  })
})
