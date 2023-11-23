import { createAction } from 'redux-actions';
import type { PodloveWebPlayerError } from '@podlove/types';

import {
  ERROR_POSTER_LOAD,
  SHOW_ERROR,
  HIDE_ERROR,
  ERROR_CONFIG_MEDIA,
  ERROR_CONFIG_MISSING
} from './types.js';

export type errorPosterLoadPayload = Event;
export type showErrorPayload = PodloveWebPlayerError;
export type hideErrorPayload = void;
export type errorMissingMediaPayload = void;
export type errorConfigMissingPayload = void;

export const errorPosterLoad = createAction<errorPosterLoadPayload>(ERROR_POSTER_LOAD);
export const showError = createAction<showErrorPayload>(SHOW_ERROR);
export const hideError = createAction<hideErrorPayload>(HIDE_ERROR);
export const errorMissingMedia = createAction<errorMissingMediaPayload>(ERROR_CONFIG_MEDIA);
export const errorConfigMissing = createAction<errorConfigMissingPayload>(ERROR_CONFIG_MISSING);
