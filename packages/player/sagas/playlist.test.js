import {
  READY,
  BACKEND_LOADING_START,
  SELECT_PLAYLIST_ENTRY,
  NEXT_PLAYLIST_ENTRY,
  BACKEND_END
} from '@podlove/player-actions/types'
import { put, takeEvery, select } from 'redux-saga/effects'
import { json } from '@podlove/utils/request'
import { init } from '@podlove/player-actions/lifecycle'
import { requestPause } from '@podlove/player-actions/play'
import * as playlist from '@podlove/player-actions/playlist'
import {
  playlistSaga,
  nextEpisode,
  loadEpisode,
  episodeEnd,
  setActiveEntry,
  requestPlay,
  resetMeta
} from './playlist'
import * as helpers from './helper'
import { errorConfigMissing } from '@podlove/player-actions/error'
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio'
import * as player from '@podlove/player-actions/play'

describe('playlist', () => {
  let selectEpisodeConfig, selectRate, selectVolume, selectMuted, selectPlaylist, selectReference

  const list = active => [
    {
      title: 'Episode 1',
      config: 'episode/1',
      duration: '00:01:00',
      active: active === 0
    },
    {
      title: 'Episode 2',
      config: 'episode/2',
      duration: '00:02:00',
      active: active === 1
    },
    {
      title: 'Episode 3',
      config: 'episode/3',
      duration: '00:03:00',
      active: active === 2
    }
  ]

  beforeEach(() => {
    selectEpisodeConfig = jest.fn()
    selectRate = jest.fn()
    selectVolume = jest.fn()
    selectMuted = jest.fn()
    selectPlaylist = jest.fn()
    selectReference = jest.fn()
    jest.spyOn(helpers, 'takeOnce')
  })

  describe('playlistSaga()', () => {
    let gen, factory

    beforeEach(() => {
      factory = playlistSaga({
        selectEpisodeConfig,
        selectRate,
        selectVolume,
        selectMuted,
        selectPlaylist,
        selectReference
      })
      gen = factory()
    })

    test('shoud export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should register nextEpisode on NEXT_PLAYLIST_ENTRY', () => {
      expect(gen.next().value).toEqual(
        takeEvery(NEXT_PLAYLIST_ENTRY, nextEpisode, { selectPlaylist })
      )
    })

    test('should register loadEpisode on SELECT_PLAYLIST_ENTRY', () => {
      gen.next()
      expect(gen.next().value).toEqual(
        takeEvery(SELECT_PLAYLIST_ENTRY, loadEpisode, {
          selectEpisodeConfig,
          selectRate,
          selectVolume,
          selectMuted
        })
      )
    })

    test('should register episodeEnd on BACKEND_END', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(takeEvery(BACKEND_END, episodeEnd))
    })

    test('should register setActiveEntry on READY once', () => {
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(helpers.takeOnce).toHaveBeenCalledWith(READY, setActiveEntry, {
        selectPlaylist,
        selectReference
      })
    })

    test('should register finish the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBe(true)
    })
  })

  describe('loadEpisode()', () => {
    let gen

    beforeEach(() => {
      gen = loadEpisode(
        { selectEpisodeConfig, selectRate, selectVolume, selectMuted },
        { payload: { play: true } }
      )
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select the episode url', () => {
      expect(gen.next().value).toEqual(select(selectEpisodeConfig))
    })

    test('should call the api with the url', () => {
      gen.next('fake/url')
      expect(gen.next().value).toEqual(json('fake/url'))
    })

    test('should select the playback rate', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(select(selectRate))
    })

    test('should select the playback volume', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(select(selectVolume))
    })

    test('should select the muted state', () => {
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(select(selectMuted))
    })

    test('should show an error if no config was fetched and end the sage', () => {
      gen.next()
      gen.next()
      gen.next(null)
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(errorConfigMissing()))
      expect(gen.next().done).toBe(true)
    })

    test('should pause the existing episode if a play was requested', () => {
      gen.next()
      gen.next()
      gen.next({ my: 'config' })
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(requestPause()))
    })

    test('should initialize the player store with the fetched config', () => {
      gen.next()
      gen.next()
      gen.next({ my: 'config' })
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(init({ my: 'config' })))
    })

    test('should play the episode if provided', () => {
      gen.next()
      gen.next()
      gen.next({ my: 'config' })
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      gen.next()
      expect(helpers.takeOnce).toHaveBeenCalledWith(READY, requestPlay)
    })

    test('should reset the playback meta once loaded', () => {
      gen.next()
      gen.next()
      gen.next({ my: 'config' })
      gen.next(1)
      gen.next(0.5)
      gen.next(true)
      gen.next()
      gen.next()
      gen.next()
      expect(helpers.takeOnce).toHaveBeenCalledWith(BACKEND_LOADING_START, resetMeta, {
        rate: 1,
        volume: 0.5,
        muted: true
      })
    })

    test('should end the saga', () => {
      gen.next()
      gen.next()
      gen.next({ my: 'config' })
      gen.next(1)
      gen.next(0.5)
      gen.next(true)
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toBe(true)
    })
  })

  describe('nextEpisode()', () => {
    let gen

    beforeEach(() => {
      gen = nextEpisode({ selectPlaylist }, { payload: { play: true } })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select the playlist', () => {
      expect(gen.next().value).toEqual(select(selectPlaylist))
    })

    test('should select the first episode if no active entry was found', () => {
      gen.next()
      expect(gen.next(list(-1)).value).toEqual(
        put(playlist.selectEpisode({ index: 0, play: true }))
      )
    })

    test('should select the first episode if the last entry was selected', () => {
      gen.next()
      expect(gen.next(list(2)).value).toEqual(put(playlist.selectEpisode({ index: 0, play: true })))
    })

    test('should select the next episode', () => {
      gen.next()
      expect(gen.next(list(0)).value).toEqual(put(playlist.selectEpisode({ index: 1, play: true })))
    })

    test('shoud end the saga', () => {
      gen.next()
      gen.next(list(0))
      gen.next()
      expect(gen.next().done).toEqual(true)
    })
  })

  describe('episodeEnd()', () => {
    let gen

    beforeEach(() => {
      gen = episodeEnd()
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should play the next episode', () => {
      expect(gen.next().value).toEqual(put(playlist.nextEpisode({ play: true })))
    })

    test('shoud end the saga', () => {
      gen.next()
      expect(gen.next().done).toEqual(true)
    })
  })

  describe('resetMeta', () => {
    let gen

    beforeEach(() => {
      gen = resetMeta({ rate: 1.2, volume: 0.8, muted: true })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should set the rate', () => {
      expect(gen.next().value).toEqual(put(setRate(1.2)))
    })

    test('should set the volume', () => {
      gen.next()
      expect(gen.next().value).toEqual(put(setVolume(0.8)))
    })

    test('should mute the audio when provided', () => {
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(mute()))
    })

    test('should unmute the audio when provided', () => {
      gen = resetMeta({ rate: 1.2, volume: 0.8, muted: false })
      gen.next()
      gen.next()
      expect(gen.next().value).toEqual(put(unmute()))
    })

    test('shoud end the saga', () => {
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().done).toEqual(true)
    })
  })

  describe('setActiveEntry', () => {
    let gen

    beforeEach(() => {
      gen = setActiveEntry({ selectPlaylist, selectReference })
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should select the existing playlist entries', () => {
      expect(gen.next().value).toEqual(select(selectPlaylist))
    })

    test('should select the current reference', () => {
      gen.next()
      expect(gen.next().value).toEqual(select(selectReference))
    })

    test('should mark the current entry active', () => {
      gen.next()
      gen.next(list(0))
      expect(gen.next('episode/3').value).toEqual(put(playlist.markActive(2)))
    })

    test('should end the saga if no reference was found', () => {
      gen.next()
      gen.next(list(0))
      expect(gen.next(null).done).toBe(true)
    })

    test('shouldnt mark an episode active if not present in the list', () => {
      gen.next()
      gen.next(list(0))
      expect(gen.next('episode/4').done).toBe(true)
    })

    test('shoud end the saga', () => {
      gen.next()
      gen.next(list(0))
      gen.next()
      expect(gen.next().done).toEqual(true)
    })
  })

  describe('requestPlay()', () => {
    let gen

    beforeEach(() => {
      gen = requestPlay()
    })

    test('should export a generator', () => {
      expect(typeof gen.next).toBe('function')
    })

    test('should dispatch request play', () => {
      expect(gen.next().value).toEqual(put(player.requestPlay()))
    })

    test('shoud end the saga', () => {
      gen.next()
      expect(gen.next().done).toEqual(true)
    })
  })
})
