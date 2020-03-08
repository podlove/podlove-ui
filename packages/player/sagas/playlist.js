import { put, takeEvery, select } from 'redux-saga/effects'
import { propOr } from 'ramda'
import {
  READY,
  BACKEND_LOADING_START,
  SELECT_PLAYLIST_ENTRY,
  NEXT_PLAYLIST_ENTRY,
  BACKEND_END
} from '@podlove/player-actions/types'
import { init } from '@podlove/player-actions/lifecycle'
import * as player from '@podlove/player-actions/play'
import * as playlist from '@podlove/player-actions/playlist'
import { errorConfigMissing } from '@podlove/player-actions/error'
import { json } from '@podlove/utils/request'
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio'

import { takeOnce } from './helper'

export const playlistSaga = ({
  selectEpisodeConfig,
  selectRate,
  selectVolume,
  selectMuted,
  selectPlaylist,
  selectReference
}) =>
  function* saga() {
    yield takeEvery(NEXT_PLAYLIST_ENTRY, nextEpisode, { selectPlaylist })
    yield takeEvery(SELECT_PLAYLIST_ENTRY, loadEpisode, {
      selectEpisodeConfig,
      selectRate,
      selectVolume,
      selectMuted
    })
    yield takeEvery(BACKEND_END, episodeEnd)
    yield takeOnce(READY, setActiveEntry, { selectPlaylist, selectReference })
  }

export function* loadEpisode(
  { selectEpisodeConfig, selectRate, selectVolume, selectMuted },
  { payload: { play } }
) {
  const url = yield select(selectEpisodeConfig)
  const config = yield json(url)

  const rate = yield select(selectRate)
  const volume = yield select(selectVolume)
  const muted = yield select(selectMuted)

  if (!config) {
    return yield put(errorConfigMissing())
  }

  if (play) {
    yield put(player.requestPause())
  }

  yield put(init(config))

  if (play) {
    yield takeOnce(READY, requestPlay)
  }

  yield takeOnce(BACKEND_LOADING_START, resetMeta, { rate, volume, muted })
}

export function* nextEpisode({ selectPlaylist }, { payload: { play } }) {
  const list = yield select(selectPlaylist)
  const current = list.findIndex(({ active }) => active)
  const next = current + 1

  if (list.length === 0) {
    return
  }

  // nothing selected yet
  if (current < 0) {
    return yield put(playlist.selectEpisode({ index: 0, play }))
  }

  // start from beginning
  if (next >= list.length) {
    return yield put(playlist.selectEpisode({ index: 0, play }))
  }

  return yield put(playlist.selectEpisode({ index: next, play }))
}

export function* episodeEnd() {
  yield put(playlist.nextEpisode({ play: true }))
}

export function* resetMeta({ rate, volume, muted }) {
  yield put(setRate(rate))
  yield put(setVolume(volume))

  yield put(muted ? mute() : unmute())
}

export function* setActiveEntry({ selectPlaylist, selectReference }) {
  const entries = yield select(selectPlaylist)
  const reference = yield select(selectReference)

  if (!reference) {
    return
  }

  const index = entries.findIndex(entry => propOr('', 'config', entry).endsWith(reference))

  if (index > -1) {
    yield put(playlist.markActive(index))
  }
}

export function* requestPlay() {
  yield put(player.requestPlay())
}
