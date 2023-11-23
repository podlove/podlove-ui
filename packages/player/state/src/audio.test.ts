import { describe, test, expect } from 'vitest';

import { SET_VOLUME, MUTE, UNMUTE, SET_RATE } from '@podlove/player-actions/types';
import { reducer, INITIAL_STATE } from './audio.js';

describe('audio', () => {
  test('should set the volume on SET_VOLUME', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_VOLUME,
        payload: 0.5
      })
    ).toEqual({
      ...INITIAL_STATE,
      volume: 0.5
    });

    expect(
      reducer(INITIAL_STATE, {
        type: SET_VOLUME,
        payload: -1
      })
    ).toEqual({
      ...INITIAL_STATE,
      volume: 0
    });

    expect(
      reducer(INITIAL_STATE, {
        type: SET_VOLUME,
        payload: 1.5
      })
    ).toEqual({
      ...INITIAL_STATE,
      volume: 1
    });
  });

  test('should mute on MUTE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: MUTE
      })
    ).toEqual({
      ...INITIAL_STATE,
      muted: true
    });
  });

  test('should mute on UNMUTE', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          muted: true
        },
        {
          type: UNMUTE
        }
      )
    ).toEqual({
      ...INITIAL_STATE,
      muted: false
    });
  });

  test('should set the rate on SET_RATE', () => {
    expect(reducer(INITIAL_STATE, { type: SET_RATE, payload: 2 })).toEqual({
      ...INITIAL_STATE,
      rate: 2
    });

    expect(reducer(INITIAL_STATE, { type: SET_RATE, payload: 0 })).toEqual({
      ...INITIAL_STATE,
      rate: 0.5
    });

    expect(reducer(INITIAL_STATE, { type: SET_RATE, payload: 4.5 })).toEqual({
      ...INITIAL_STATE,
      rate: 4
    });
  });
});
