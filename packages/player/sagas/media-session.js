/* global MediaMetadata */

import { takeEvery, put, select, call } from 'redux-saga/effects'
import { min, max } from 'ramda'
import { READY, UPDATE_CHAPTER, SET_CHAPTER } from '@podlove/player-actions/types'
import * as media from '@podlove/player-actions/play'
import * as timepiece from '@podlove/player-actions/timepiece'
import * as chapters from '@podlove/player-actions/chapters'
import { channel, mediaControl } from './helper'

export const mediaSessionSaga = ({
  selectPoster,
  selectTitle,
  selectShow,
  selectPlaytime,
  selectDuration,
  selectChapterTitle
}) =>
  function* saga() {
    if (!navigator.mediaSession) {
      return
    }

    yield takeEvery(READY, setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    })
    yield takeEvery(UPDATE_CHAPTER, setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    })
    yield takeEvery(SET_CHAPTER, setMetadata, {
      selectPoster,
      selectTitle,
      selectShow,
      selectChapterTitle
    })

    const playEvent = yield call(channel, mediaControl('play'))
    const pauseEvent = yield call(channel, mediaControl('pause'))
    const stepBackwardEvent = yield call(channel, mediaControl('seekbackward'))
    const stepForwardEvent = yield call(channel, mediaControl('seekforward'))
    const previousChapterEvent = yield call(channel, mediaControl('previoustrack'))
    const nextChapterEvent = yield call(channel, mediaControl('nexttrack'))

    yield takeEvery(playEvent, play)
    yield takeEvery(pauseEvent, pause)
    yield takeEvery(stepBackwardEvent, stepBackward, { selectPlaytime })
    yield takeEvery(stepForwardEvent, stepForward, { selectPlaytime, selectDuration })
    yield takeEvery(previousChapterEvent, previousChapter)
    yield takeEvery(nextChapterEvent, nextChapter)
  }

export function* setMetadata({ selectPoster, selectTitle, selectShow, selectChapterTitle }) {
  const cover = yield select(selectPoster)
  const title = yield select(selectTitle)
  const show = yield select(selectShow)
  const chapterTitle = yield select(selectChapterTitle)

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    album: chapterTitle,
    artist: show,
    artwork: [{ src: cover }]
  })
}

/////
export function* play() {
  yield put(media.requestPlay())
}

export function* pause() {
  yield put(media.requestPause())
}

export function* stepForward({ selectPlaytime, selectDuration }) {
  const playtime = yield select(selectPlaytime)
  const duration = yield select(selectDuration)

  yield put(timepiece.requestPlaytime(min(playtime + 30000, duration)))
}

export function* stepBackward({ selectPlaytime }) {
  const playtime = yield select(selectPlaytime)

  yield put(timepiece.requestPlaytime(max(playtime - 15000, 0)))
}

export function* nextChapter() {
  yield put(chapters.nextChapter())
}

export function* previousChapter() {
  yield put(chapters.previousChapter())
}
