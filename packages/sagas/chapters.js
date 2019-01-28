import { propOr, prop } from 'ramda'
import { takeEvery, select, put } from 'redux-saga/effects'
import { INIT } from '@podlove/actions/types'
import * as config from '@podlove/utils/config'
import { setChapters } from '@podlove/actions/chapters'
import { toPlayerTime } from '@podlove/utils/time'
import { hostname } from '@podlove/utils/url'

export default ({ selectDuration }) => function* chaptersSaga () {
  yield takeEvery(INIT, initChapters)

  function* initChapters ({ payload }) {
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

    yield put(setChapters(state))
  }
}
