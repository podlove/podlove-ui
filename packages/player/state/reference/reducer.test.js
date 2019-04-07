import { INIT } from '@podlove/player-actions/types'
import { INITIAL_STATE, reducer } from './reducer'

describe('reference', () => {
  test('should parse reference on INIT', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: INIT,
        payload: {
          reference: {
            share: 'share',
            origin: 'origin',
            config: 'config'
          }
        }
      })
    ).toEqual({
      share: 'share',
      origin: 'origin',
      config: 'config'
    })
  })
})
