import { createAction } from 'redux-actions'
import { SHOW_OVERLAY, INIT } from './reducers/types'

export const showOverlay = createAction(SHOW_OVERLAY)
export const init = createAction(INIT)
