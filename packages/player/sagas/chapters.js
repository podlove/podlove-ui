import { propOr, prop } from 'ramda'
import { takeEvery, select, put } from 'redux-saga/effects'
import {
  INIT,
  REQUEST_PLAYTIME,
  BACKEND_PLAYTIME,
  SET_CHAPTER,
  DISABLE_GHOST_MODE,
  PREVIOUS_CHAPTER,
  NEXT_CHAPTER
} from '@podlove/player-actions/types'
import * as config from '@podlove/utils/config'
import * as chapter from '@podlove/player-actions/chapters'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { toPlayerTime } from '@podlove/utils/time'
import { hostname } from '@podlove/utils/url'

export default ({ selectDuration, selectPlaytime, selectCurrentChapter, selectChapterList }) =>
  function* chaptersSaga() {
    yield takeEvery(INIT, initChapters)
    yield takeEvery(REQUEST_PLAYTIME, chapterUpdate)
    yield takeEvery(BACKEND_PLAYTIME, chapterUpdate)
    yield takeEvery(SET_CHAPTER, setChapter)
    yield takeEvery(DISABLE_GHOST_MODE, resetChapter)
    yield takeEvery(PREVIOUS_CHAPTER, previousChapter)
    yield takeEvery(NEXT_CHAPTER, nextChapter)

    function* initChapters({ payload }) {
      const chapters = config.chapters(payload)
      const duration = yield select(selectDuration)

      const state = chapters.reduce((result, chapter, index, chapters) => {
        const end = propOr({ start: duration }, index + 1, chapters)
        const href = propOr(null, 'href', chapter)

        return [
          ...result,
          {
            index: index + 1,
            start: toPlayerTime(chapter.start),
            end: toPlayerTime(end.start),
            title: prop('title', chapter),
            image: prop('image', chapter),
            href,
            linkTitle: href ? hostname(href) : null
          }
        ]
      }, [])

      yield put(chapter.setChapters(state))
    }

    function* chapterUpdate({ payload }) {
      yield put(chapter.updateChapter(payload))
    }

    function* setChapter() {
      const current = yield select(selectCurrentChapter)
      yield put(requestPlaytime(current.start))
    }

    function* resetChapter() {
      const playtime = yield select(selectPlaytime)
      yield put(chapter.updateChapter(playtime))
    }

    function* previousChapter() {
      const playtime = yield select(selectPlaytime)
      const { start, index } = yield select(selectCurrentChapter)

      if (playtime - start <= 2) {
        yield put(previousChapter())
      } else {
        yield put(chapter.setChapter(index - 1))
      }
    }

    function* nextChapter() {
      const duration = yield select(selectDuration)
      const playtime = yield select(selectPlaytime)
      const chapters = yield select(selectChapterList)
      const { start, index } = yield select(selectCurrentChapter)

      const chapterStart = index === chapters.length && playtime >= start ? duration : start

      yield put(requestPlaytime(chapterStart))
    }
  }

/**
 *
 *
 *  [PREVIOUS_CHAPTER]: ({ dispatch }, _, state) => {
    const playtime = get(state, 'playtime', 0)
    const { start, index } = selectCurrentChapter(state)

    if (playtime - start <= 2) {
      dispatch(actions.setPreviousChapter())
    } else {
      dispatch(actions.setChapter(index - 1))
    }
  },

  [SET_PREVIOUS_CHAPTER]: ({ dispatch }, _, state) => {
    const { start, index } = selectCurrentChapter(state)

    dispatch(actions.updatePlaytime((index - 1) <= 0 ? 0 : start))
  },

  [NEXT_CHAPTER]: ({ dispatch }, { payload }) => {
    dispatch(actions.setNextChapter(payload))
  },

  [SET_NEXT_CHAPTER]: ({ dispatch }, _, state) => {
    const duration = get(state, 'duration', 0)
    const playtime = get(state, 'playtime', 0)
    const chapters = selectChapters(state)
    const { start, index } = selectCurrentChapter(state)

    const chapterStart = index === chapters.length &&
      playtime >= start
      ? duration
      : start

    dispatch(actions.updatePlaytime(chapterStart))
  },

  // Reset chapters if ghost mode was disabled
  [DISABLE_GHOST_MODE]: ({ dispatch }, _, state) => {
    const playtime = get(state, 'playtime', 0)
    dispatch(actions.updateChapter(playtime))
  }
 */
