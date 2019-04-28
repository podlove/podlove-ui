import { errorSaga, retryPlay, networkError, configMediaError } from './error'
import { put, takeEvery } from 'redux-saga/effects'
import { RETRY_PLAY, BACKEND_ERROR, ERROR_CONFIG_MEDIA } from '@podlove/player-actions/types'
import { showError, hideError } from '@podlove/player-actions/error'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

describe('error', () => {
  describe('errorSaga()', () => {
    let gen

    beforeEach(() => {
      gen = errorSaga()
    })

    it('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    it('shoud register networkError on BACKEND_ERROR', () => {
      expect(gen.next().value).toEqual(takeEvery(BACKEND_ERROR, networkError))
    })

    it('shoud register retryPlay on RETRY_PLAY', () => {
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(RETRY_PLAY, retryPlay))
    })

    it('shoud register retryPlay on RETRY_PLAY', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(ERROR_CONFIG_MEDIA, configMediaError))
    })

    it('should end the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('retryPlay()', () => {
    let gen

    beforeEach(() => {
      gen = retryPlay()
    })

    it('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    it('should dispatch HIDE_ERROR', () => {
      expect(gen.next().value).toEqual(put(hideError()))
    })

    it('should dispatch REQUEST_PAUSE', () => {
      gen.next()
      expect(gen.next().value).toEqual(put(requestPause()))
    })

    it('should dispatch REQUEST_PLAY', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(requestPlay()))
    })

    it('should end the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('networkError()', () => {
    let gen

    beforeEach(() => {
      gen = networkError()
    })

    it('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    it('should dispatch SHOW_ERROR', () => {
      gen.next()
      expect(gen.next().value).toEqual(
        put(
          showError({
            title: 'ERROR.NETWORK.TITLE',
            message: 'ERROR.NETWORK.MESSAGE',
            icon: 'missing-connection',
            retry: RETRY_PLAY
          })
        )
      )
    })
  })

  describe('configMediaError()', () => {
    let gen

    beforeEach(() => {
      gen = configMediaError()
    })

    it('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    it('should dispatch SHOW_ERROR', () => {
      expect(gen.next().value).toEqual(
        put(
          showError({
            title: 'ERROR.MEDIA.TITLE',
            message: 'ERROR.MEDIA.MESSAGE',
            icon: 'invalid-configuration'
          })
        )
      )
    })
  })
})
