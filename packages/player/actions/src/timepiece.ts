import { createAction } from 'redux-actions';

import {
  BACKEND_PLAYTIME,
  REQUEST_PLAYTIME,
  SIMULATE_PLAYTIME,
  BACKEND_DURATION,
  BACKEND_LIVESYNC,
  UPDATE_PLAYTIME
} from './types.js';

export type backendPlaytimePayload = number;
export type requestPlaytimePayload = number;
export type simulatePlaytimePayload = number;
export type backendDurationPayload = number;
export type backendLiveSyncPayload = number;
export type updatePlaytimePayload = number;

export const backendPlaytime = createAction<backendPlaytimePayload>(BACKEND_PLAYTIME);
export const requestPlaytime = createAction<requestPlaytimePayload>(REQUEST_PLAYTIME);
export const simulatePlaytime = createAction<simulatePlaytimePayload>(SIMULATE_PLAYTIME);
export const backendDuration = createAction<backendDurationPayload>(BACKEND_DURATION);
export const backendLiveSync = createAction<backendLiveSyncPayload>(BACKEND_LIVESYNC);
export const updatePlaytime = createAction<updatePlaytimePayload>(UPDATE_PLAYTIME);
