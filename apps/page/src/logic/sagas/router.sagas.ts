import { get } from 'lodash-es'
import { toHumanTime, toPlayerTime } from '@podlove/utils/time'
import { select, throttle, put, takeEvery, delay } from 'redux-saga/effects'
import { BACKEND_PLAYTIME } from '@podlove/player-actions/types'
import { takeOnce } from '@podlove/player-sagas/helper'
import { requestPlaytime } from '@podlove/player-actions/timepiece'

import { actions as routerActions } from '../reducers/router.store'
import * as player from '../reducers/player.store'
import * as playbar from '../reducers/playbar.store'

export default ({
  selectEpisode,
  selectCurrentId,
  selectPlaybarActive,
  selectFollowContent,
  router
}) => {
  function* setPlaytime({ payload }) {
    const searchParams = new URLSearchParams(window.location.search)
    const playbar = yield select(selectPlaybarActive)
    const episode = yield select(selectEpisode)
    const current = yield select(selectCurrentId)

    if (!playbar || episode !== current) {
      return
    }

    searchParams.set('t', toHumanTime(payload))
    window.history.replaceState({}, '', `${location.pathname}?${searchParams}`)
  }

  function* restoreEpisode({ payload }) {
    yield delay(1000)
    const id = get(payload, ['params', 'id'])
    const playtime = get(payload, ['query', 't'])

    if (!id || !playtime) {
      return
    }

    yield put(player.actions.restoreEpisode({ id, playtime: toPlayerTime(playtime) }))
  }

  function* restorePlaytime({ payload }) {
    const id = get(payload, ['params', 'id'])
    const playtime = get(payload, ['query', 't'])

    if (!id || !playtime) {
      return
    }

    yield put(requestPlaytime(toPlayerTime(playtime)))
  }

  function* followContent() {
    const follow = yield select(selectFollowContent)
    const episode = yield select(selectEpisode)
    const current = yield select(selectCurrentId)

    if (!follow) {
      return
    }

    if (episode === current) {
      return
    }

    router.push({ path: `/episode/${episode}` })
  }

  function* unfollowContent() {
    const follow = yield select(selectFollowContent)
    const episode = yield select(selectEpisode)
    const current = yield select(selectCurrentId)

    if (!follow) {
      return
    }

    if (episode === current) {
      return
    }

    yield put(playbar.actions.toggleFollowContent())
  }

  return function* () {
    yield throttle(1000, BACKEND_PLAYTIME, setPlaytime)
    yield takeOnce(routerActions.routeTo, restoreEpisode)
    yield takeEvery(routerActions.routeTo, restorePlaytime)
    yield takeEvery(routerActions.routeTo, unfollowContent)
    yield takeEvery(playbar.types.FOLLOW_CONTENT, followContent)
  }
}
