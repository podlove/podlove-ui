import { describe, test, beforeEach, expect } from 'vitest';
import { put } from 'redux-saga/effects'
import { setVersion } from '@podlove/player-actions/runtime'
import { versionSaga } from './version'

describe('version', () => {
  describe('versionSaga()', () => {
    let factory, gen
    beforeEach(() => {
      factory = versionSaga({ version: '1.2.3' })
      gen = factory()
    })

    test('should export a factory', () => {
      expect(typeof factory).toBe('function')
    })

    test('should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should call SET_VERSION with the provided version', () => {
      expect(gen.next().value).toEqual(put(setVersion('1.2.3')))
    })

    test('should end the saga', () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
