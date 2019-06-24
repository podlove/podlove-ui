import { createAction } from 'redux-actions'
import { INIT, READY, RESTORE, CONSTRUCTED } from './types'

export const init = createAction(INIT)
export const ready = createAction(READY)
export const restore = createAction(RESTORE)
export const constructed = createAction(CONSTRUCTED)
