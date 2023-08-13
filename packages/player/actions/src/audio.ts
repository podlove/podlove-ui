import { createAction } from 'redux-actions'
import { SET_VOLUME, MUTE, UNMUTE, SET_RATE } from './types.js'

export type setVolumeActionPayload = number;
export type muteActionPayload = void;
export type unmuteActionPayload = void;
export type setRateActionPayload = number;

export const setVolume = createAction<setVolumeActionPayload>(SET_VOLUME)
export const mute = createAction<muteActionPayload>(MUTE)
export const unmute = createAction<unmuteActionPayload>(UNMUTE)
export const setRate = createAction<setRateActionPayload>(SET_RATE)
