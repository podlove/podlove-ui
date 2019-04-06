import { INIT } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('media', () => {
  test('it extracts the media on INIT', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: INIT,
        payload: {
          audio: [
            {
              url: 'url',
              size: 'size',
              title: 'title',
              mimeType: 'mimeType'
            }
          ]
        }
      })
    ).toEqual([
      {
        url: 'url',
        size: 'size',
        title: 'title',
        mimeType: 'mimeType'
      }
    ])
  })
})
