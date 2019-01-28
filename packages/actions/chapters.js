import { createAction } from 'redux-actions'
import { SET_CHAPTERS, NEXT_CHAPTER, PREVIOUS_CHAPTER } from './types'

export const setChapters = createAction(SET_CHAPTERS)
export const nextChapter = createAction(NEXT_CHAPTER)
export const previousChapter = createAction(PREVIOUS_CHAPTER)
