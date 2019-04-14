import { runtimeSaga } from './runtime'
import { put } from 'redux-saga/effects'
import { setRuntime } from '@podlove/player-actions/runtime'

describe('runtime', () => {
  describe('runtimeSaga()', () => {
    let gen

    beforeEach(() => {
      gen = runtimeSaga()
    })

    test('should be a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch SET_RUNTIME', () => {
      expect(gen.next().value).toEqual(
        put(
          setRuntime({
            browser: 'undefined:undefined',
            platform: 'desktop',
            language: 'en',
            locale: 'en-US'
          })
        )
      )
    })

    test('should end the saga', () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
