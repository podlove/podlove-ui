import { createAction } from 'redux-actions';
import type { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import { INIT, READY, RESTORE, CONSTRUCTED } from './types.js';

export type initPayload = PodloveWebPlayerEpisode;
export type readyPayload = Partial<PodloveWebPlayerEpisode & PodloveWebPlayerConfig>;
export type restorePayload = void;
export type constructedPayload = PodloveWebPlayerEpisode & PodloveWebPlayerConfig;

export const init = createAction<initPayload>(INIT);
export const ready = createAction<readyPayload>(READY);
export const restore = createAction<restorePayload>(RESTORE);
export const constructed = createAction<constructedPayload>(CONSTRUCTED);
