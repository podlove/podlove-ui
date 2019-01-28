import { NEXT_CHAPTER, NEXT_CHAPTER, PREVIOUS_CHAPTER, PREVIOUS_CHAPTER, SET_CHAPTER, UPDATE_CHAPTER, INIT_CHAPTERS } from '../types'

import { createAction } from 'redux-actions'

export const nextChapter = createAction(NEXT_CHAPTER)
export const setNextChapter = createAction(NEXT_CHAPTER)
export const previousChapter = createAction(PREVIOUS_CHAPTER)
export const setPreviousChapter = createAction(PREVIOUS_CHAPTER)
export const setChapter = createAction(SET_CHAPTER)
export const updateChapter = createAction(UPDATE_CHAPTER)
export const initChapters = createAction(INIT_CHAPTERS)
