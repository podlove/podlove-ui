import { createAction } from 'redux-actions';
import type { PodloveWebPlayerEpisode } from '@podlove/types';
import { INIT, READY, RESTORE, CONSTRUCTED } from './types.js';

export type initPayload = PodloveWebPlayerEpisode;
export type readyPayload = PodloveWebPlayerEpisode;
export type restorePayload = void;
export type constructedPayload = PodloveWebPlayerEpisode;

export const init = createAction<initPayload>(INIT);
export const ready = createAction<readyPayload>(READY);
export const restore = createAction<restorePayload>(RESTORE);
export const constructed = createAction<constructedPayload>(CONSTRUCTED);
