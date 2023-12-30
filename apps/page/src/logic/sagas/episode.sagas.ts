import { fetch } from 'gridsome'
import { delay } from 'redux-saga/effects'
import { isEmpty, path, isNil } from 'ramda'
import { put, takeEvery, select } from 'redux-saga/effects'
import { READY, BACKEND_LOADING_START } from '@podlove/player-actions/types'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { takeOnce } from '@podlove/player-sagas/helper'
import { setRate, setVolume, mute, unmute } from '@podlove/player-actions/audio'

import * as player from '../reducers/player.store'
import * as episodes from '../reducers/episodes.store'

export default ({
  selectEpisode,
  selectRate,
  selectVolume,
  selectMuted,
  selectCurrentEpisode,
  selectPlaying
}) => {
  function* resetMeta() {
    const rate = yield select(selectRate)
    const volume = yield select(selectVolume)
    const muted = yield select(selectMuted)

    yield put(setRate(rate))
    yield put(setVolume(volume))

    yield put(muted ? mute() : unmute())
  }

  function* loadEpisode(id) {
    let episode = yield select(selectEpisode(id))

    if (isEmpty(episode)) {
      const result = yield fetch(`/episode/${id}`)
      episode = path(['data', 'podcastEpisode'], result)
      yield put(episodes.actions.addEpisode(episode))
    }

    return episode
  }

  function* injectEpisode(episode) {
    const playing = yield select(selectPlaying)

    if (playing) {
      yield put(requestPause())
    }

    yield put({ type: READY, payload: episode })
    yield delay(100)
    yield put(requestPlay())
    yield takeOnce(BACKEND_LOADING_START, resetMeta)
  }

  function* playEpisode({ payload: { id, playtime } }) {
    const currentEpisode = yield select(selectCurrentEpisode)
    const playing = yield select(selectPlaying)

    if (currentEpisode === id && playing) {
      if (!isNil(playtime)) {
        yield put(requestPlaytime(playtime))
      }

      return
    }

    yield put(player.actions.selectEpisode(id))

    const episode = yield loadEpisode(id)

    if (currentEpisode !== id) {
      yield injectEpisode(episode)
    } else {
      yield put(requestPlay())
    }

    if (playtime) {
      yield put(requestPlaytime(playtime))
    }
  }

  function* pauseEpisode() {
    yield put(requestPause())
  }

  function* restoreEpisode({ payload: { id, playtime } }) {
    yield put(requestPause())
    yield put(player.actions.selectEpisode(id))

    const episode = yield loadEpisode(id)
    yield put({ type: READY, payload: episode })
    yield delay(100)
    yield put(requestPlaytime(playtime))
    yield takeOnce(BACKEND_LOADING_START, resetMeta)
  }

  return function* () {
    yield takeEvery(player.types.EPISODE_PLAY, playEpisode)
    yield takeEvery(player.types.EPISODE_PAUSE, pauseEpisode)
    yield takeEvery(player.types.EPISODE_RESTORE, restoreEpisode)
  }
}
