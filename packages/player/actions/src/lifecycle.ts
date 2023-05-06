import { createAction } from 'redux-actions';
import type { PodloveWebPlayerResolvedConfig } from '@podlove/types';
import { INIT, READY, RESTORE, CONSTRUCTED } from './types';

export type initPayload = PodloveWebPlayerResolvedConfig;
export type readyPayload = PodloveWebPlayerResolvedConfig;
export type restorePayload = void;
export type constructedPayload = PodloveWebPlayerResolvedConfig;

export const init = createAction<initPayload>(INIT);
export const ready = createAction<readyPayload>(READY);
export const restore = createAction<restorePayload>(RESTORE);
export const constructed = createAction<constructedPayload>(CONSTRUCTED);
