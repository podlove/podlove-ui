import { describe, test, expect } from 'vitest';
import { READY } from '@podlove/player-actions/types';

import { reducer, INITIAL_STATE } from './show';

describe('show', () => {
  test(`it is a reducer function`, () => {
    expect(typeof reducer).toBe('function');
  });

  test('it parses the show on READY', () => {
    const payload = {
      show: {
        title: 'show title',
        subtitle: 'show subtitle',
        summary: 'show summary',
        link: 'show link',
        poster: 'show poster'
      }
    };

    expect(
      reducer(INITIAL_STATE, {
        type: READY,
        payload
      })
    ).toEqual({
      title: 'show title',
      subtitle: 'show subtitle',
      summary: 'show summary',
      link: 'show link',
      poster: 'show poster'
    });
  });
});
