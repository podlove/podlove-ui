import { createAction } from 'redux-actions'
import { INIT, READY } from './types'

export const init = createAction(INIT)
export const ready = createAction(READY)
