import { INIT } from '@podlove/player-actions/types'
import { takeEvery, put } from 'redux-saga/effects'
import { ready } from '@podlove/player-actions/lifecycle'

import { lifeCycleSaga, validateConfig } from './lifecycle'

describe('lifecycle', () => {
  describe('lifeCycleSaga()', () => {
    test('should export a generator', () => {
      const gen = lifeCycleSaga()
      expect(typeof gen.next).toBe('function')
    })

    test('should register validateConfig on INIT', () => {
      const gen = lifeCycleSaga()
      expect(gen.next().value).toEqual(takeEvery(INIT, validateConfig))
    })
  })

  describe('validateConfig()', () => {
    test('should dispatch READY', () => {
      const gen = validateConfig({ payload: { foo: 'bar' } })
      expect(gen.next().value).toEqual(put(ready({ foo: 'bar' })))
      expect(gen.next().done).toBeTruthy()
    })
  })
})
