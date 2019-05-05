import * as keyboard from '@podlove/utils/keyboard'
import { channel } from './helper'
import { call, takeEvery, put, select } from 'redux-saga/effects'
import { keyUp, keyDown } from '@podlove/player-actions/keyboard'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import * as chapters from '@podlove/player-actions/chapters'
import * as audio from '@podlove/player-actions/audio'

import {
  keyboardSaga,
  scrubForward,
  scrubBackward,
  playPause,
  nextChapter,
  previousChapter,
  changeVolume,
  changeRate,
  mute,
  dispatchKeyUp,
  dispatchKeyDown
} from './keyboard'

describe('keyboard', () => {
  let selectPlaytime, selectDuration, selectPlaystate, selectVolume, selectRate, selectMuted

  beforeEach(() => {
    selectPlaytime = jest.fn()
    selectDuration = jest.fn()
    selectPlaystate = jest.fn()
    selectVolume = jest.fn()
    selectRate = jest.fn()
    selectMuted = jest.fn()
  })

  describe('keyboardSaga()', () => {
    let factory, gen

    beforeEach(() => {
      factory = keyboardSaga({
        selectPlaytime,
        selectDuration,
        selectPlaystate,
        selectVolume,
        selectRate,
        selectMuted
      })
      gen = factory()
    })

    test(`should export a factory`, () => {
      expect(typeof factory).toBe('function')
    })

    test('should propduce a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should create a keydown channel`, () => {
      expect(gen.next().value).toEqual(call(channel, keyboard.keydown))
    })

    test(`should create a keyup channel`, () => {
      gen.next()
      expect(gen.next().value).toEqual(call(channel, keyboard.keyup))
    })

    test(`should register KEY_DOWN on keydown channel`, () => {
      const keydown = jest.fn()
      gen.next()
      gen.next(keydown)
      expect(gen.next().value).toEqual(takeEvery(keydown, dispatchKeyDown))
    })

    test(`should register KEY_UP on keyup channel`, () => {
      const keyup = jest.fn()
      gen.next()
      gen.next()
      gen.next(keyup)
      expect(gen.next().value).toEqual(takeEvery(keyup, dispatchKeyUp))
    })
  })

  describe(`scrubForward()`, () => {
    let gen

    beforeEach(() => {
      gen = scrubForward(selectPlaytime, selectDuration)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select the playtime`, () => {
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test(`should select the duration`, () => {
      gen.next()
      expect(gen.next().value).toEqual(select(selectDuration))
    })

    test(`should dispatch the playtime + 2 seconds if playtime is smaller than duration`, () => {
      gen.next()
      gen.next(2000)
      expect(gen.next(8000).value).toEqual(put(requestPlaytime(4000)))
    })

    test(`should dispatch the duration if playtime is bigger than duration`, () => {
      gen.next()
      gen.next(7000)
      expect(gen.next(8000).value).toEqual(put(requestPlaytime(8000)))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`scrubBackward()`, () => {
    let gen

    beforeEach(() => {
      gen = scrubBackward(selectPlaytime)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select the playtime`, () => {
      expect(gen.next().value).toEqual(select(selectPlaytime))
    })

    test(`should dispatch the playtime - 2 seconds if playtime is larger than 0`, () => {
      gen.next()
      expect(gen.next(8000).value).toEqual(put(requestPlaytime(6000)))
    })

    test(`should dispatch the 0 if playtime is smaller than 0`, () => {
      gen.next()
      expect(gen.next(1000).value).toEqual(put(requestPlaytime(0)))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`playPause()`, () => {
    let gen

    beforeEach(() => {
      gen = playPause(selectPlaystate)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select the playstate`, () => {
      expect(gen.next().value).toEqual(select(selectPlaystate))
    })

    test(`should dispatch REQUEST_PLAY if paused`, () => {
      gen.next()
      expect(gen.next(false).value).toEqual(put(requestPlay()))
    })

    test(`should dispatch REQUEST_PAUSE if playing`, () => {
      gen.next()
      expect(gen.next(true).value).toEqual(put(requestPause()))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`nextChapter()`, () => {
    let gen

    beforeEach(() => {
      gen = nextChapter(selectPlaystate)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should dispatch NEXT_CHAPTER`, () => {
      expect(gen.next().value).toEqual(put(chapters.nextChapter()))
    })

    test(`should end the saga`, () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`previousChapter()`, () => {
    let gen

    beforeEach(() => {
      gen = previousChapter(selectPlaystate)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should dispatch PREVIOUS_CHAPTER`, () => {
      expect(gen.next().value).toEqual(put(chapters.previousChapter()))
    })

    test(`should end the saga`, () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`changeVolume()`, () => {
    let factory, gen

    beforeEach(() => {
      factory = changeVolume(1)
      gen = factory(selectVolume)
    })

    test(`should export a factory`, () => {
      expect(typeof factory).toBe('function')
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select volume`, () => {
      expect(gen.next().value).toEqual(select(selectVolume))
    })

    test(`should dispatch SET_VOLUME with modifier`, () => {
      gen.next()
      expect(gen.next(1).value).toEqual(put(audio.setVolume(2)))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`changeRate()`, () => {
    let factory, gen

    beforeEach(() => {
      factory = changeRate(1)
      gen = factory(selectRate)
    })

    test(`should export a factory`, () => {
      expect(typeof factory).toBe('function')
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select rate`, () => {
      expect(gen.next().value).toEqual(select(selectRate))
    })

    test(`should dispatch SET_RATE with modifier`, () => {
      gen.next()
      expect(gen.next(1).value).toEqual(put(audio.setRate(2)))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`mute()`, () => {
    let gen

    beforeEach(() => {
      gen = mute(selectMuted)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should select the muted state`, () => {
      expect(gen.next().value).toEqual(select(selectMuted))
    })

    test(`should dispatch UNMUTE if muted`, () => {
      gen.next()
      expect(gen.next(true).value).toEqual(put(audio.unmute()))
    })

    test(`should dispatch MUTE if unmuted`, () => {
      gen.next()
      expect(gen.next(false).value).toEqual(put(audio.mute()))
    })

    test(`should end the saga`, () => {
      gen.next()
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`dispatchKeyUp()`, () => {
    const keyEvent = { key: 'a', ctrl: false, shift: false, meta: false, alt: false }
    let gen

    beforeEach(() => {
      gen = dispatchKeyUp(keyEvent)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should dispatch KEY_UP`, () => {
      expect(gen.next().value).toEqual(put(keyUp(keyEvent)))
    })

    test(`should end the saga`, () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })

  describe(`dispatchKeyDown()`, () => {
    const keyEvent = { key: 'a', ctrl: false, shift: false, meta: false, alt: false }
    let gen

    beforeEach(() => {
      gen = dispatchKeyDown(keyEvent)
    })

    test(`should export a generator`, () => {
      expect(typeof gen.next).toBe('function')
    })

    test(`should dispatch KEY_DOWN`, () => {
      expect(gen.next().value).toEqual(put(keyDown(keyEvent)))
    })

    test(`should end the saga`, () => {
      gen.next()
      expect(gen.next().done).toBeTruthy()
    })
  })
})
