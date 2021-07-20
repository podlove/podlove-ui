import { SELECT_CONTENT } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('content', () => {
  test('should update the selected content on SELECT_CONTENT', () => {
    ;['show', 'episode', 'chapter', 'time'].forEach((content) =>
      expect(
        reducer(INITIAL_STATE, {
          type: SELECT_CONTENT,
          payload: content
        })
      ).toEqual(content)
    )

    expect(
      reducer(INITIAL_STATE, {
        type: SELECT_CONTENT,
        payload: 'fooo'
      })
    ).toEqual('episode')
  })
})
