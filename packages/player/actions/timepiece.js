import { createAction } from 'redux-actions'

import { BACKEND_PLAYTIME, REQUEST_PLAYTIME, SIMULATE_PLAYTIME, BACKEND_DURATION } from './types'

export const backendPlaytime = createAction(BACKEND_PLAYTIME)
export const requestPlaytime = createAction(REQUEST_PLAYTIME)
export const simulatePlaytime = createAction(SIMULATE_PLAYTIME)
export const backendDuration = createAction(BACKEND_DURATION)
