import { createAction } from 'redux-actions'
import { HIDE_OVERLAY, SHOW_OVERLAY, INIT } from './reducers/types'

export const hideOverlay = createAction(HIDE_OVERLAY)
export const showOverlay = createAction(SHOW_OVERLAY)
export const init = createAction(INIT)
