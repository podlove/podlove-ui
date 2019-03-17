import { put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga/lib'
import { last, find, isNumber, endsWith } from 'lodash'
import { compose, map, orderBy, reduce, concat } from 'lodash/fp'

import { INIT, BACKEND_PLAYTIME, REQUEST_PLAYTIME, DISABLE_GHOST_MODE, SIMULATE_PLAYTIME, SEARCH_TRANSCRIPTS } from '@podlove/player-actions/types'
import { setTranscriptsTimeline, updateTranscripts, setTranscriptsSearchResults } from '@podlove/player-actions/transcripts'
import { secondsToMilliseconds, toPlayerTime } from '@podlove/utils/time'
import { transcripts as getTranscripts } from '@podlove/utils/config'
import { inAnimationFrame  } from '@podlove/utils/helper'
import { binarySearch, textSearch } from '@podlove/utils/search'

const transformTime = time => isNumber(time) ? secondsToMilliseconds(time) : toPlayerTime(time)

const isNewChunk = (current, last) => {
  if (last === undefined) {
    return true
  }

  const differentSpeaker = current.speaker !== last.speaker
  const text = last.texts.reduce((result, item) => result + ' ' + item.text, '')
  const endOfSentence = endsWith(text, '.') || endsWith(text, '!') || endsWith(text, '?')

  return differentSpeaker || (text.length > 500 && endOfSentence)
}

const transformTranscript = reduce((transcripts, chunk) => {
  const lastChunk = last(transcripts)

  if (isNewChunk(chunk, lastChunk)) {
    return [
      ...transcripts,
      {
        type: 'transcript',
        start: transformTime(chunk.start),
        end: transformTime(chunk.end),
        speaker: chunk.speaker,
        texts: [
          {
            start: transformTime(chunk.start),
            end: transformTime(chunk.end),
            text: chunk.text
          }
        ]
      }
    ]
  }

  return [
    ...transcripts.slice(0, -1),
    {
      ...lastChunk,
      end: transformTime(chunk.end),
      texts: [
        ...lastChunk.texts,
        {
          start: transformTime(chunk.start),
          end: transformTime(chunk.end),
          text: chunk.text
        }
      ]
    }
  ]
}, [])

const transformChapters = chapters => chapters.map((chapter, index) => ({
  ...chapter,
  type: 'chapter',
  index: index + 1
}))

const mapSpeakers = speakers =>
  map(transcript => {
    if (transcript.type === 'chapter') {
      return transcript
    }

    const result = find(speakers, { id: transcript.speaker })

    return {
      ...transcript,
      speaker: result
    }
  })

export default ({ selectSpeakers, selectChapters }) => function* () {
  yield takeEvery(INIT, init)

  function* init ({ payload }) {
    const speakers = yield select(selectSpeakers)
    const chapters = yield select(selectChapters)

    const assignSpeakers = mapSpeakers(speakers)
    const transcripts = compose(orderBy('start', 'asc'), concat(transformChapters(chapters)), assignSpeakers, transformTranscript, getTranscripts)(payload)
    const searchIndex = inAnimationFrame(binarySearch(transcripts.map(({ start }) => start)))
    const searchText = textSearch(transcripts.map(({ texts = [] }) => texts.map(({ text }) => text).join(' ')))

    yield put(setTranscriptsTimeline(transcripts))
    yield takeEvery(BACKEND_PLAYTIME, update, searchIndex)
    yield takeEvery(REQUEST_PLAYTIME, update, searchIndex)
    yield takeEvery(DISABLE_GHOST_MODE, debouncedUpdate, searchIndex)
    yield takeEvery(SIMULATE_PLAYTIME, debouncedUpdate, searchIndex)
    yield takeEvery(SIMULATE_PLAYTIME, debouncedUpdate, searchIndex)
    yield takeEvery(SEARCH_TRANSCRIPTS, search, searchText)
  }

  function* update (searchFn, { payload }) {
    const index = searchFn(payload)

    if (index) {
      yield put(updateTranscripts(index))
    }
  }

  function* debouncedUpdate (searchFn, { payload }) {
    const index = searchFn(payload)
    yield delay(200)

    if (index) {
      yield put(updateTranscripts(index))
    }
  }

  function* search (searchFn, { payload }) {
    const results = searchFn(payload)

    if (results) {
      yield put(setTranscriptsSearchResults(results))
    }
  }
}
