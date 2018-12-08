import { takeEvery, select } from 'redux-saga/effects'
import { INIT } from '@podlove/actions/types'
import * as config from '@podlove/utils/config'

export default function* ({ selectPlaytime, selectDuration }) {
  yield takeEvery(INIT, initChapters)

  function* initChapters ({ payload }) {
    const chapters = config.chapters(payload)
    const playtime = select(selectPlaytime)
    const duration = select(selectDuration)

  }
}


// [INIT]: ({ dispatch }, { payload }, state) => {
//   const chapters = get(payload, 'chapters', [])
//   const playtime = get(state, 'playtime', 0)
//   const duration = get(state, 'duration', 0)

//   const requestChapters = isString(chapters)
//     ? request(chapters)
//     : Promise.resolve(chapters)

//   requestChapters
//     .catch(() => [])
//     .then(chapters => chapters.reduce(parseChapters(duration), []))
//     .then(chapters => chapters.map(setActiveByPlaytime(playtime)))
//     .then(fallbackToLastChapter(playtime))
//     .then(actions.initChapters)
//     .then(dispatch)
// },
