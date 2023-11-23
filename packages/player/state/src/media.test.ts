import { describe, test, expect } from 'vitest';
import { READY } from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './media'

describe('media', () => {
  test('it extracts the media on READY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
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
