import { createAction } from 'redux-actions'
import { STEP_FORWARD, STEP_BACKWARDS } from './types.js'

export const stepForward = createAction<void>(STEP_FORWARD)
export const stepBackwards = createAction<void>(STEP_BACKWARDS)
