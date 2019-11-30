import { propOr, prop } from 'ramda'
import { takeEvery, select, put } from 'redux-saga/effects'
import {
  READY,
  REQUEST_PLAYTIME,
  BACKEND_PLAYTIME,
  SET_CHAPTER,
  DISABLE_GHOST_MODE,
  PREVIOUS_CHAPTER,
  NEXT_CHAPTER
} from '@podlove/player-actions/types'
import * as config from '@podlove/player-config'
import * as chapter from '@podlove/player-actions/chapters'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { toPlayerTime } from '@podlove/utils/time'
import { hostname } from '@podlove/utils/url'

export const chaptersSaga = ({
  selectDuration,
  selectPlaytime,
  selectCurrentChapter,
  selectChapterList
}) =>
  function* saga() {
    yield takeEvery(READY, initChapters, {
      selectDuration
    })
    yield takeEvery(REQUEST_PLAYTIME, chapterUpdate)
    yield takeEvery(BACKEND_PLAYTIME, chapterUpdate)
    yield takeEvery(SET_CHAPTER, setChapter, {
      selectCurrentChapter
    })
    yield takeEvery(DISABLE_GHOST_MODE, resetChapter, {
      selectPlaytime
    })
    yield takeEvery(PREVIOUS_CHAPTER, previousChapter, {
      selectPlaytime,
      selectCurrentChapter
    })
    yield takeEvery(NEXT_CHAPTER, nextChapter, {
      selectCurrentChapter,
      selectChapterList
    })
  }

export function* chapterUpdate({ payload }) {
  yield put(chapter.updateChapter(payload))
}

export function* setChapter({ selectCurrentChapter }) {
  const current = yield select(selectCurrentChapter)
  yield put(requestPlaytime(current.start))
}

export function* resetChapter({ selectPlaytime }) {
  const playtime = yield select(selectPlaytime)
  yield put(chapter.updateChapter(playtime))
}

export function* previousChapter({ selectPlaytime, selectCurrentChapter }) {
  const playtime = yield select(selectPlaytime)
  const { start, index } = yield select(selectCurrentChapter)

  if (playtime - start <= 1000) {
    yield put(chapter.setChapter(index - 2 < 0 ? 0 : index - 2))
  } else {
    yield put(chapter.setChapter(index - 1 < 0 ? 0 : index - 1))
  }
}

export function* nextChapter({ selectChapterList, selectCurrentChapter }) {
  const chapters = yield select(selectChapterList)
  const { index } = yield select(selectCurrentChapter)

  yield put(chapter.setChapter(index > chapters.length - 1 ? chapters.length - 1 : index))
}

export function* initChapters({ selectDuration }, { payload }) {
  const chapters = config.chapters(payload)
  const duration = yield select(selectDuration)

  const state = chapters.reduce((result, chapter, index, chapters) => {
    const end = propOr({ start: duration }, index + 1, chapters)
    const href = propOr('', 'href', chapter).trim()

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
