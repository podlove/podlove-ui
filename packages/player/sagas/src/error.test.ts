import { describe, test, beforeEach, expect } from 'vitest';
import { errorSaga, retryPlay, networkError, configMediaError, configMissingError } from './error';
import { put, takeEvery } from 'redux-saga/effects';
import {
  RETRY_PLAY,
  BACKEND_ERROR,
  ERROR_CONFIG_MEDIA,
  ERROR_CONFIG_MISSING
} from '@podlove/player-actions/types';
import { showError, hideError } from '@podlove/player-actions/error';
import { requestPlay, requestPause } from '@podlove/player-actions/play';

describe('error', () => {
  describe('errorSaga()', () => {
    let gen;

    beforeEach(() => {
      gen = errorSaga();
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('shoud register networkError on BACKEND_ERROR', () => {
      expect(gen.next().value).toEqual(takeEvery(BACKEND_ERROR, networkError));
    });

    test('shoud register retryPlay on RETRY_PLAY', () => {
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(RETRY_PLAY, retryPlay));
    });

    test('shoud register retryPlay on ERROR_CONFIG_MEDIA', () => {
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(ERROR_CONFIG_MEDIA, configMediaError));
    });

    test('shoud register configMissingError on ERROR_CONFIG_MISSING', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(takeEvery(ERROR_CONFIG_MISSING, configMissingError));
    });

    test('should end the saga', () => {
      gen.next();
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('retryPlay()', () => {
    let gen;

    beforeEach(() => {
      gen = retryPlay();
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch HIDE_ERROR', () => {
      expect(gen.next().value).toEqual(put(hideError()));
    });

    test('should dispatch REQUEST_PAUSE', () => {
      gen.next();
      expect(gen.next().value).toEqual(put(requestPause()));
    });

    test('should dispatch REQUEST_PLAY', () => {
      gen.next();
      gen.next();
      expect(gen.next().value).toEqual(put(requestPlay()));
    });

    test('should end the saga', () => {
      gen.next();
      gen.next();
      gen.next();
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('networkError()', () => {
    let gen;

    beforeEach(() => {
      gen = networkError();
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_ERROR', () => {
      gen.next();
      expect(gen.next().value).toEqual(
        put(
          showError({
            title: 'ERROR.NETWORK.TITLE',
            message: 'ERROR.NETWORK.MESSAGE',
            retry: RETRY_PLAY
          })
        )
      );
    });
  });

  describe('configMediaError()', () => {
    let gen;

    beforeEach(() => {
      gen = configMediaError();
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_ERROR', () => {
      expect(gen.next().value).toEqual(
        put(
          showError({
            title: 'ERROR.MEDIA.TITLE',
            message: 'ERROR.MEDIA.MESSAGE'
          })
        )
      );
    });
  });

  describe('configMissingError()', () => {
    let gen;

    beforeEach(() => {
      gen = configMissingError();
    });

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function');
    });

    test('should dispatch SHOW_ERROR', () => {
      expect(gen.next().value).toEqual(
        put(
          showError({
            title: 'ERROR.CONFIG.TITLE',
            message: 'ERROR.CONFIG.MESSAGE'
          })
        )
      );
    });
  });
});
