import { createAction } from 'redux-actions'

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
  BACKEND_ERROR
} from './types'

export const requestPlay = createAction(REQUEST_PLAY)
export const backendPlay = createAction(BACKEND_PLAY)

export const requestPause = createAction(REQUEST_PAUSE)
export const backendPause = createAction(BACKEND_PAUSE)

export const requestRestart = createAction(REQUEST_RESTART)

export const backendLoadingStart = createAction(BACKEND_LOADING_START)
export const backendLoadingEnd = createAction(BACKEND_LOADING_END)
export const backendBuffer = createAction(BACKEND_BUFFER)
export const backendEnd = createAction(BACKEND_END)

export const backendError = createAction(BACKEND_ERROR)
