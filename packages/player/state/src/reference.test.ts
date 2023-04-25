import { describe, test, expect } from 'vitest';
import { READY } from '@podlove/player-actions/types';
import { INITIAL_STATE, reducer } from './reference';

describe('reference', () => {
  test('should parse reference on READY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
        payload: {
          version: 5,
          reference: {
            share: 'share',
            origin: 'origin',
            config: 'config',
            episode: 'episode'
          }
        }
      })
    ).toEqual({
      share: 'share',
      origin: 'origin',
      config: 'config',
      episode: 'episode'
    });
  });
});
