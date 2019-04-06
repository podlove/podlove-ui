import { SELECT_EMBED_SIZE } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('embed', () => {
  test('should update the selected embed size on SELECT_EMBED_SIZE', () => {
    ;['250x400', '320x400', '375x400', '600x290', '768x290'].forEach(size => {
      expect(
        reducer(INITIAL_STATE, {
          type: SELECT_EMBED_SIZE,
          payload: size
        })
      ).toEqual({
        ...INITIAL_STATE,
        size
      })
    })

    expect(
      reducer(INITIAL_STATE, {
        type: SELECT_EMBED_SIZE,
        payload: '2000x2000'
      })
    ).toEqual({
      ...INITIAL_STATE,
      size: '320x400'
    })
  })
})
