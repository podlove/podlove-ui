import { takeEvery, select, put } from 'redux-saga/effects'
import { STEP_FORWARD, STEP_BACKWARDS } from '@podlove/player-actions/types'
import { stepperSaga, stepForward, stepBackward } from './stepper'
import { requestPlaytime } from '@podlove/player-actions/timepiece'

describe('stepper', () => {
  describe('stepperSaga()', () => {
    let factory
    let gen
    let selectDuration
    let selectPlaytime

    beforeEach(() => {
      selectDuration = jest.fn()
      selectPlaytime = jest.fn()

      factory = stepperSaga({ selectDuration, selectPlaytime })
      gen = factory()
    })

    test('should export a factory', () => {
      expect(typeof factory).toBe('function')
    })

    test('should create a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should register stepForward on STEP_FORWARD', () => {
      expect(gen.next().value).toEqual(
        takeEvery(STEP_FORWARD, stepForward, { selectDuration, selectPlaytime })
      )
    })

    test('should register stepBackward on STEP_BACKWARDS', () => {
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(STEP_BACKWARDS, stepBackward, { selectPlaytime }))
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('stepForward()', () => {
    let gen
    let selectDuration
    let selectPlaytime

    beforeEach(() => {
      selectDuration = jest.fn()
      selectPlaytime = jest.fn()

      gen = stepForward({ selectDuration, selectPlaytime })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select duration', () => {
      expect(gen.next().value).toEqual(select(selectDuration))
    })

    test('should select playtime', () => {
      gen.next()
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test('should dispatch REQUEST_PLAYTIME with current playtime + 30 seconds', () => {
      gen.next()
      gen.next(300000)
      expect(gen.next(10000).value).toEqual(put(requestPlaytime(40000)))
    })

    test('should dispatch REQUEST_PLAYTIME with duration if playtime + 30 seconds', () => {
      gen.next()
      gen.next(300000)
      expect(gen.next(300000).value).toEqual(put(requestPlaytime(300000)))
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('stepBackward()', () => {
    let gen
    let selectPlaytime

    beforeEach(() => {
      selectPlaytime = jest.fn()

      gen = stepBackward({ selectPlaytime })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select playtime', () => {
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test('should dispatch REQUEST_PLAYTIME with current playtime - 15 seconds', () => {
      gen.next()
      expect(gen.next(200000).value).toEqual(put(requestPlaytime(185000)))
    })

    test('should dispatch REQUEST_PLAYTIME with duration if playtime + 30 seconds', () => {
      gen.next()
      expect(gen.next(1000).value).toEqual(put(requestPlaytime(0)))
    })

    test('should complete the saga', () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
