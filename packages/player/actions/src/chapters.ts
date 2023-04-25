import { createAction } from 'redux-actions';
import type { PodloveWebPlayerChapter } from '@podlove/types';

import {
  SET_CHAPTERS_LIST,
  NEXT_CHAPTER,
  PREVIOUS_CHAPTER,
  SET_CHAPTER,
  UPDATE_CHAPTER
} from './types';

export type setChaptersPayload = PodloveWebPlayerChapter[];
export type setChapterPayload = number;
export type updateChapterPayload = number;

export const setChapters = createAction<setChaptersPayload>(SET_CHAPTERS_LIST);
export const nextChapter = createAction<void>(NEXT_CHAPTER);
export const previousChapter = createAction<void>(PREVIOUS_CHAPTER);
export const setChapter = createAction<setChapterPayload>(SET_CHAPTER);
export const updateChapter = createAction<updateChapterPayload>(UPDATE_CHAPTER);
