import { createAction } from 'redux-actions'
import { HIDE_OVERLAY, SHOW_OVERLAY } from './types'

export const hide = createAction(HIDE_OVERLAY)
export const show = createAction(SHOW_OVERLAY)
