import { createAction } from './action-creator'
import { KEY_DOWN, KEY_UP } from './types'

export const keyDown = createAction(KEY_DOWN)
export const keyUp = createAction(KEY_UP)
