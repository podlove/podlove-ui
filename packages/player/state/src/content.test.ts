import { describe, test, expect } from 'vitest';
import { SELECT_CONTENT } from '@podlove/player-actions/types';
import { reducer, INITIAL_STATE } from './content.js';
import { PodloveWebPlayerContent } from '@podlove/types';

describe('content', () => {
  test('should update the selected content on SELECT_CONTENT', () => {
    ['show', 'episode', 'chapter', 'time'].forEach((content) =>
      expect(
        reducer(INITIAL_STATE, {
          type: SELECT_CONTENT,
          payload: content as PodloveWebPlayerContent
        })
      ).toEqual(content)
    );

    expect(
      reducer(INITIAL_STATE, {
        type: SELECT_CONTENT,
        payload: 'fooo' as any
      })
    ).toEqual('episode');
  });
});
