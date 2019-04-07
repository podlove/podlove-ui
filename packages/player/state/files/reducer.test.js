import { reducer, INITIAL_STATE } from './reducer'
import { INIT } from '@podlove/player-actions/types'

describe('files', () => {
  test('extracts files on INIT', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: INIT,
        payload: {
          files: [
            {
              url: 'url',
              length: 1337,
              mimeType: 'mp4/audio'
            },
            {
              url: 'url',
              length: 1337,
              mimeType: 'mp4/video'
            }
          ]
        }
      })
    ).toEqual({
      audio: [
        {
          url: 'url',
          length: 1337,
          mimeType: 'mp4/audio'
        }
      ]
    })
  })
})
