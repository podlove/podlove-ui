import { reducer, INITIAL_STATE } from './reducer'
import { READY } from '@podlove/player-actions/types'

describe('files', () => {
  test('extracts files on READY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
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
            },
            {
              url: 'url1',
              length: 1337,
              mimeType: 'mp4/video'
            }
          ]
        }
      })
    ).toEqual([
      {
        url: 'url',
        length: 1337,
        mimeType: 'mp4/audio'
      },
      {
        url: 'url1',
        length: 1337,
        mimeType: 'mp4/video'
      }
    ])
  })
})
