import { createAction } from 'redux-actions'

import { REQUEST_PLAY, REQUEST_PAUSE, REQUEST_RESTART } from './types'

export const requestPlay = createAction(REQUEST_PLAY)
export const requestPause = createAction(REQUEST_PAUSE)
export const requestRestart = createAction(REQUEST_RESTART)
