import { describe, test, beforeEach, expect, vi } from 'vitest';
import { takeEvery, select, put } from 'typed-redux-saga';
import { STEP_FORWARD, STEP_BACKWARDS } from '@podlove/player-actions/types';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { stepperSaga, stepForward, stepBackward } from './stepper';

describe('stepper', () => {
  describe('stepperSaga()', () => {
    let factory;
    let gen;
    let selectDuration;
    let selectPlaytime;
    let selectLivesync;

    beforeEach(() => {
      selectDuration = vi.fn();
      selectPlaytime = vi.fn();
      selectLivesync = vi.fn();

      factory = stepperSaga({ selectDuration, selectPlaytime, selectLivesync });
      gen = factory();
    });

    test('should export a factory', () => {
      expect(typeof factory).toBe('function');
    });

    test('should create a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should register stepForward on STEP_FORWARD', () => {
      expect(gen.next().value).toEqual(
        takeEvery(STEP_FORWARD, stepForward, { selectDuration, selectPlaytime, selectLivesync })
      );
    });

    test('should register stepBackward on STEP_BACKWARDS', () => {
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(STEP_BACKWARDS, stepBackward, { selectPlaytime }));
    });

    test('should complete the saga', () => {
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('stepForward()', () => {
    let gen;
    let selectDuration;
    let selectPlaytime;
    let selectLivesync;

    beforeEach(() => {
      selectDuration = vi.fn();
      selectPlaytime = vi.fn();
      selectLivesync = vi.fn();

      gen = stepForward({ selectDuration, selectPlaytime, selectLivesync });
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should select duration', () => {
      expect(gen.next().value).toEqual(select(selectDuration));
    });

    test('should select playtime', () => {
      gen.next();
      expect(gen.next().value).toEqual(select(selectPlaytime));
    });

    test('should dispatch REQUEST_PLAYTIME with current playtime + 30 seconds', () => {
      gen.next();
      gen.next(300000);
      gen.next(0);
      expect(gen.next(0).value).toEqual(put(requestPlaytime(30000)));
    });

    test('should dispatch REQUEST_PLAYTIME with duration if playtime + 30 seconds', () => {
      gen.next();
      gen.next(300000);
      gen.next(300000);
      expect(gen.next(0).value).toEqual(put(requestPlaytime(300000)));
    });

    test('should dispatch REQUEST_PLAYTIME with livesync as the upper boundary if its greater 0', () => {
      gen.next();
      gen.next(300000);
      gen.next(300000);
      expect(gen.next(200000).value).toEqual(put(requestPlaytime(200000)));
    });

    test('should complete the saga', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('stepBackward()', () => {
    let gen;
    let selectPlaytime;

    beforeEach(() => {
      selectPlaytime = vi.fn();

      gen = stepBackward({ selectPlaytime });
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should select playtime', () => {
      expect(gen.next().value).toEqual(select(selectPlaytime));
    });

    test('should dispatch REQUEST_PLAYTIME with current playtime - 15 seconds', () => {
      gen.next();
      expect(gen.next(200000).value).toEqual(put(requestPlaytime(185000)));
    });

    test('should dispatch REQUEST_PLAYTIME with duration if playtime + 30 seconds', () => {
      gen.next();
      expect(gen.next(1000).value).toEqual(put(requestPlaytime(0)));
    });

    test('should complete the saga', () => {
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });
});
