import { handleActions } from 'redux-actions'

import { UPDATE_CHAPTER, SET_CHAPTERS_LIST, SET_CHAPTER } from '@podlove/player-actions/types'

import {
  currentChapterIndex,
  setActiveByPlaytime,
  setActiveByIndex,
  nextChapter as getNextChapter,
  previousChapter as getPreviousChapter,
  currentChapter as getCurrentChapter
} from '@podlove/utils/chapters'

const generateState = (chapters) => ({
  list: chapters,
  current: getCurrentChapter(chapters),
  next: getNextChapter(chapters),
  previous: getPreviousChapter(chapters)
})

export const INITIAL_STATE = {
  list: [],
  current: null,
  next: null,
  previous: null
}

export const reducer = handleActions(
  {
    [SET_CHAPTERS_LIST]: (_, { payload = [] }) =>
      generateState(payload.map((item, index) => (index === 0 ? { active: true, ...item } : item))),

    [SET_CHAPTER]: (state, { payload }) => {
      const chapters = state.list.map(setActiveByIndex(payload))
      return generateState(chapters)
    },

    [UPDATE_CHAPTER]: (state, { payload }) => {
      const chapters = state.list.map(setActiveByPlaytime(payload))

      if (currentChapterIndex(chapters) === -1) {
        return state
      }

      return generateState(chapters)
    }
  },
  INITIAL_STATE
)
