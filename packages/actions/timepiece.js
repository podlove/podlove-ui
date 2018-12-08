import { createAction } from 'redux-actions'

import { BACKEND_PLAYTIME, REQUEST_PLAYTIME, SET_DURATION } from './types'

export const backendPlaytime = createAction(BACKEND_PLAYTIME)
export const requestPlaytime = createAction(REQUEST_PLAYTIME)
export const setDuration = createAction(SET_DURATION)
