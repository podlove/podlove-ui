import { componentsSaga, play, pause, loading, loaded } from './components'
import { put, takeEvery } from 'redux-saga/effects'
import {
  BACKEND_PLAY,
  BACKEND_PAUSE,
  BACKEND_LOADING_START,
  BACKEND_LOADING_END
} from '@podlove/player-actions/types'
import {
  showPlayingButton,
  showLoadingButton,
  showPauseButton,
  showProgressBar,
  showSteppersControls,
  showChapterControls
} from '@podlove/player-actions/components'

describe('components', () => {
  describe('componentsSaga()', () => {
    test('shoud export a generator', () => {
      const gen = componentsSaga()
      expect(typeof gen.next).toBe('function')
    })

    test('should register play on BACKEND_PLAY', () => {
      const gen = componentsSaga()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PLAY, play))
    })

    test('should register pause on BACKEND_PAUSE', () => {
      const gen = componentsSaga()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_PAUSE, pause))
    })

    test('should register loading on BACKEND_LOADING_START', () => {
      const gen = componentsSaga()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_LOADING_START, loading))
    })

    test('should register loading on BACKEND_LOADING_END', () => {
      const gen = componentsSaga()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_LOADING_END, loaded))
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('play()', () => {
    test('shoud export a generator', () => {
      const gen = play()
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING', () => {
      const gen = play()
      expect(gen.next().value).toEqual(put(showPlayingButton()))
    })

    test('should dispatch SHOW_COMPONENT_PROGRESSBAR', () => {
      const gen = play()
      gen.next()
      expect(gen.next().value).toEqual(put(showProgressBar()))
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_STEPPERS', () => {
      const gen = play()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(showSteppersControls()))
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_CHAPTERS', () => {
      const gen = play()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(showSteppersControls()))
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_CHAPTERS', () => {
      const gen = play()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(showChapterControls()))
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('pause()', () => {
    test('shoud export a generator', () => {
      const gen = pause()
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE', () => {
      const gen = pause()
      expect(gen.next().value).toEqual(put(showPauseButton()))
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('loading()', () => {
    test('shoud export a generator', () => {
      const gen = loading()
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_LOADING', () => {
      const gen = loading()
      expect(gen.next().value).toEqual(put(showLoadingButton()))
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe('loaded()', () => {
    test('shoud export a generator', () => {
      const gen = loaded({ payload: null })
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE on paused', () => {
      const gen = loaded({ payload: { paused: true } })
      expect(gen.next().value).toEqual(put(showPauseButton()))
      expect(gen.next().done).toBeTruthy()
    })

    test('should dispatch SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING on paused', () => {
      const gen = loaded({ payload: { paused: false } })
      expect(gen.next().value).toEqual(put(showPlayingButton()))
      expect(gen.next().done).toBeTruthy()
    })
  })
})
