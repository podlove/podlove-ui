import { createAction } from 'redux-actions';
import type { PodloveWebPlayerAudioError, PodloveWebPlayerAudioProps } from '@podlove/types';

import {
  REQUEST_PLAY,
  REQUEST_PAUSE,
  REQUEST_RESTART,
  BACKEND_PLAY,
  BACKEND_PAUSE,
  BACKEND_END,
  BACKEND_LOADING_START,
  BACKEND_LOADING_END,
  BACKEND_BUFFER,
  BACKEND_ERROR,
  REQUEST_LOAD,
  REQUEST_STOP
} from './types';

export type requestPlayPayload = void;
export type backendPlayPayload = void;
export type requestPausePayload = void;
export type requestLoadPayload = void;
export type backendPausePayload = void;
export type requestStopPayload = void;
export type requestRestartPayload = void;
export type backendLoadingStartPayload = void;
export type backendLoadingEndPayload = PodloveWebPlayerAudioProps;
export type backendBufferPayload = [number, number][];
export type backendEndPayload = void;
export type backendErrorPayload = PodloveWebPlayerAudioError;

export const requestPlay = createAction<requestPlayPayload>(REQUEST_PLAY);
export const backendPlay = createAction<backendPlayPayload>(BACKEND_PLAY);

export const requestPause = createAction<requestPausePayload>(REQUEST_PAUSE);
export const requestStop = createAction<requestStopPayload>(REQUEST_STOP);
export const requestLoad = createAction<requestLoadPayload>(REQUEST_LOAD);
export const backendPause = createAction<backendPausePayload>(BACKEND_PAUSE);

export const requestRestart = createAction<requestRestartPayload>(REQUEST_RESTART);

export const backendLoadingStart = createAction<backendLoadingStartPayload>(BACKEND_LOADING_START);
export const backendLoadingEnd = createAction<backendLoadingEndPayload>(BACKEND_LOADING_END);
export const backendBuffer = createAction<backendBufferPayload>(BACKEND_BUFFER);
export const backendEnd = createAction<backendEndPayload>(BACKEND_END);

export const backendError = createAction<backendErrorPayload>(BACKEND_ERROR);
