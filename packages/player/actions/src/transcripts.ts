import { createAction } from 'redux-actions';

import {
  SET_TRANSCRIPTS_TIMELINE,
  UPDATE_TRANSCRIPTS,
  TOGGLE_FOLLOW_TRANSCRIPTS,
  SEARCH_TRANSCRIPTS,
  RESET_SEARCH_TRANSCRIPTS,
  SET_SEARCH_TRANSCRIPTS_RESULTS,
  NEXT_SEARCH_RESULT,
  PREVIOUS_SEARCH_RESULT
} from './types';

import type {
  PodloveWebPlayerTimelineChapterEntry,
  PodloveWebPlayerTimelineTranscriptEntry
} from '@podlove/types';

export interface setTranscriptsTimelinePayload {
  timeline: (PodloveWebPlayerTimelineChapterEntry | PodloveWebPlayerTimelineTranscriptEntry)[];
  hasTranscripts: boolean;
};
export type updateTranscriptsPayload = number;
export type followTranscriptsPayload = boolean;
export type searchTranscriptsPayload = string;
export type resetSearchTranscriptionPayload = void;
export type setTranscriptsSearchResultsPayload = number[];
export type nextTranscriptsSearchResultPayload = void;
export type previousTranscriptsSearchResultPayload = void;

export const setTranscriptsTimeline = createAction<setTranscriptsTimelinePayload>(
  SET_TRANSCRIPTS_TIMELINE
);
export const updateTranscripts = createAction<updateTranscriptsPayload>(
  UPDATE_TRANSCRIPTS
);
export const followTranscripts = createAction<followTranscriptsPayload>(
  TOGGLE_FOLLOW_TRANSCRIPTS
);
export const searchTranscripts = createAction<searchTranscriptsPayload>(SEARCH_TRANSCRIPTS);
export const resetSearchTranscription =
  createAction<resetSearchTranscriptionPayload>(RESET_SEARCH_TRANSCRIPTS);
export const setTranscriptsSearchResults = createAction<setTranscriptsSearchResultsPayload>(
  SET_SEARCH_TRANSCRIPTS_RESULTS
);
export const nextTranscriptsSearchResult =
  createAction<nextTranscriptsSearchResultPayload>(NEXT_SEARCH_RESULT);
export const previousTranscriptsSearchResult =
  createAction<previousTranscriptsSearchResultPayload>(PREVIOUS_SEARCH_RESULT);
