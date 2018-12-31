import { createAction } from 'redux-actions'
import { STEP_FORWARD, STEP_BACKWARDS } from './types'

export const stepForward = createAction(STEP_FORWARD)
export const stepBackwards = createAction(STEP_BACKWARDS)
