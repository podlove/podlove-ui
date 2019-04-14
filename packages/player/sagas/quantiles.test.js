import { takeEvery, put } from 'redux-saga/effects'
import {
  BACKEND_PLAYTIME,
  NEXT_CHAPTER,
  PREVIOUS_CHAPTER,
  UPDATE_PLAYTIME
} from '@podlove/player-actions/types'
import { setQuantiles } from '@podlove/player-actions/quantiles'

import { quantilesSaga, resetTime, updateQuantiles } from './quantiles'

describe('quantiles', () => {
  describe('quantilesSaga()', () => {
    let gen

    beforeEach(() => {
      gen = quantilesSaga()
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should register resetTime on NEXT_CHAPTER', () => {
      expect(gen.next().value).toEqual(takeEvery(NEXT_CHAPTER, resetTime))
    })

    test('should register resetTime on PREVIOUS_CHAPTER', () => {
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(PREVIOUS_CHAPTER, resetTime))
    })

    test('should register resetTime on UPDATE_PLAYTIME', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(UPDATE_PLAYTIME, resetTime))
    })

    test('should register resetTime on BACKEND_PLAYTIME', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PLAYTIME, updateQuantiles))
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('updateQuantiles()', () => {
    let gen

    beforeEach(() => {
      gen = updateQuantiles({ payload: 10 })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('shoud dispatch SET_QUANTILES with given time', () => {
      expect(gen.next().value).toEqual(put(setQuantiles({ start: 10, end: 10 })))
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
