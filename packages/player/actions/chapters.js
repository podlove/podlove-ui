import { createAction } from 'redux-actions'
import { SET_CHAPTERS_LIST, NEXT_CHAPTER, PREVIOUS_CHAPTER, SET_CHAPTER, UPDATE_CHAPTER } from './types'

export const setChapters = createAction(SET_CHAPTERS_LIST)
export const nextChapter = createAction(NEXT_CHAPTER)
export const previousChapter = createAction(PREVIOUS_CHAPTER)
export const setChapter = createAction(SET_CHAPTER)
export const updateChapter = createAction(UPDATE_CHAPTER)
