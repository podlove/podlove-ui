import { createAction } from 'redux-actions';
import type { PodloveWebPlayerFile } from '@podlove/types';
import { FILE_HOVER, FILE_SELECT } from './types.js';

export type selectFilePayload = PodloveWebPlayerFile;
export type hoverFilePayload = PodloveWebPlayerFile;

export const selectFile = createAction<selectFilePayload>(FILE_SELECT);
export const hoverFile = createAction<hoverFilePayload>(FILE_HOVER);
