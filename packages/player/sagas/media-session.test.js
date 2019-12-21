import { READY, UPDATE_CHAPTER, SET_CHAPTER } from '@podlove/player-actions/types'
import { takeEvery, put, select } from 'redux-saga/effects'
import {
  mediaSessionSaga,
  setMetadata,
  play,
  pause,
  stepBackward,
  stepForward,
  previousChapter,
  nextChapter
} from './media-session'
import * as helper from './helper'
import * as media from '@podlove/player-actions/play'
import * as timepiece from '@podlove/player-actions/timepiece'
import * as chapters from '@podlove/player-actions/chapters'

describe('MediaSession', () => {
  let selectPoster, selectTitle, selectShow, selectPlaytime, selectDuration, selectChapterTitle

  beforeEach(() => {
    selectPlaytime = jest.fn()
    selectDuration = jest.fn()
    selectTitle = jest.fn()
    selectShow = jest.fn()
    selectChapterTitle = jest.fn()
    selectPoster = jest.fn()

    jest.spyOn(helper, 'mediaControl')
  })

  describe('mediaSessionSaga()', () => {
    let factory, gen

    Object.defineProperty(window.navigator, 'mediaSession', {
      value: {
        setActionHandler: jest.fn()
      }
    })

    beforeEach(() => {
      factory = mediaSessionSaga({
        selectPoster,
        selectTitle,
        selectShow,
        selectPlaytime,
        selectDuration,
        selectChapterTitle
      })

      gen = factory()
    })

    test(`should export a factory`, () => {
      expect(typeof factory).toBe('function')
    })

    test('should propduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    describe('metadata', () => {
      test('should assign metadata on READY', () => {
        expect(gen.next().value).toEqual(
          takeEvery(READY, setMetadata, {
            selectPoster,
            selectTitle,
            selectShow,
            selectChapterTitle
          })
        )
      })

      test('should assign metadata on UPDATE_CHAPTER', () => {
        gen.next()
        expect(gen.next().value).toEqual(
          takeEvery(UPDATE_CHAPTER, setMetadata, {
            selectPoster,
            selectTitle,
            selectShow,
            selectChapterTitle
          })
        )
      })

      test('should assign metadata on SET_CHAPTER', () => {
        gen.next()
        gen.next()
        expect(gen.next().value).toEqual(
          takeEvery(SET_CHAPTER, setMetadata, {
            selectPoster,
            selectTitle,
            selectShow,
            selectChapterTitle
          })
        )
      })
    })

    describe('control events', () => {
      test('should create a playEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('play')
      })

      test('should create a pauseEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('pause')
      })

      test('should create a stepBackwardEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('seekbackward')
      })

      test('should create a stepForwardEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('seekforward')
      })

      test('should create a previousChapterEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('previoustrack')
      })

      test('should create a nextChapterEvent channel', () => {
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(helper.mediaControl).toHaveBeenCalledWith('nexttrack')
      })
    })

    describe('event bridge', () => {
      const saga = ({ payload: { args } }) => args[1]
      let playEvent,
        pauseEvent,
        stepBackwardEvent,
        stepForwardEvent,
        previousChapterEvent,
        nextChapterEvent

      beforeEach(() => {
        playEvent = jest.fn()
        pauseEvent = jest.fn()
        stepBackwardEvent = jest.fn()
        stepForwardEvent = jest.fn()
        previousChapterEvent = jest.fn()
        nextChapterEvent = jest.fn()

        gen.next()
        gen.next()
        gen.next()
        gen.next()

        gen.next(playEvent)
        gen.next(pauseEvent)
        gen.next(stepBackwardEvent)
        gen.next(stepForwardEvent)
        gen.next(previousChapterEvent)
      })

      it('should call the play saga', () => {
        expect(saga(gen.next(nextChapterEvent).value)).toEqual(play)
      })

      it('should call the pause saga', () => {
        gen.next(nextChapterEvent)
        expect(saga(gen.next().value)).toEqual(pause)
      })

      it('should call the stepBackward saga', () => {
        gen.next(nextChapterEvent)
        gen.next()
        expect(saga(gen.next().value)).toEqual(stepBackward)
      })

      it('should call the stepForward saga', () => {
        gen.next(nextChapterEvent)
        gen.next()
        gen.next()
        expect(saga(gen.next().value)).toEqual(stepForward)
      })

      it('should call the previousChapter saga', () => {
        gen.next(nextChapterEvent)
        gen.next()
        gen.next()
        gen.next()
        expect(saga(gen.next().value)).toEqual(previousChapter)
      })

      it('should call the nextChapter saga', () => {
        gen.next(nextChapterEvent)
        gen.next()
        gen.next()
        gen.next()
        gen.next()
        expect(saga(gen.next().value)).toEqual(nextChapter)
      })
    })
  })

  describe('play()', () => {
    let gen
    beforeEach(() => {
      gen = play()
    })

    test('should propduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch request play event', () => {
      expect(gen.next().value).toEqual(put(media.requestPlay()))
    })
  })

  describe('pause()', () => {
    let gen
    beforeEach(() => {
      gen = pause()
    })

    test('should prooduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch request pause event', () => {
      expect(gen.next().value).toEqual(put(media.requestPause()))
    })
  })

  describe('stepForward()', () => {
    let gen
    beforeEach(() => {
      gen = stepForward({ selectPlaytime, selectDuration })
    })

    test('should prooduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select the playtime', () => {
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test('should select the duration', () => {
      gen.next(0)
      expect(gen.next().value).toEqual(select(selectDuration))
    })

    test('should dispatch the request playtime event with additional 30 seconds', () => {
      gen.next()
      gen.next(0)
      expect(gen.next(40000).value).toEqual(put(timepiece.requestPlaytime(30000)))
    })

    test('should dispatch the request playtime event with duration if playtime and buffer is larger', () => {
      gen.next()
      gen.next(20000)
      expect(gen.next(40000).value).toEqual(put(timepiece.requestPlaytime(40000)))
    })
  })

  describe('stepBackward()', () => {
    let gen
    beforeEach(() => {
      gen = stepBackward({ selectPlaytime })
    })

    test('should prooduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select the playtime', () => {
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test('should dispatch the request playtime event minus 15 seconds', () => {
      gen.next()
      expect(gen.next(40000).value).toEqual(put(timepiece.requestPlaytime(25000)))
    })

    test('should dispatch the request playtime event with 0 if playtime and buffer is smaller', () => {
      gen.next()
      expect(gen.next(7000).value).toEqual(put(timepiece.requestPlaytime(0)))
    })
  })

  describe('nextChapter()', () => {
    let gen
    beforeEach(() => {
      gen = nextChapter()
    })

    test('should prooduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch request nextChapter event', () => {
      expect(gen.next().value).toEqual(put(chapters.nextChapter()))
    })
  })

  describe('previousChapter()', () => {
    let gen
    beforeEach(() => {
      gen = previousChapter()
    })

    test('should prooduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch request previousChapter event', () => {
      expect(gen.next().value).toEqual(put(chapters.previousChapter()))
    })
  })
})
