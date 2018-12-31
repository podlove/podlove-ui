import { createAction } from 'redux-actions'
import { NEXT_CHAPTER, PREVIOUS_CHAPTER } from './types'

export const nextChapter = createAction(NEXT_CHAPTER)
export const previousChapter = createAction(PREVIOUS_CHAPTER)
