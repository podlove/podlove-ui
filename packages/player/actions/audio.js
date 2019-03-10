import { createAction } from 'redux-actions'
import { SET_VOLUME, MUTE, UNMUTE, SET_RATE } from './types'

export const setVolume = createAction(SET_VOLUME)
export const mute = createAction(MUTE)
export const unmute = createAction(UNMUTE)
export const setRate = createAction(SET_RATE)
