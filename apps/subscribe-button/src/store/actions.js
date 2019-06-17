import { createAction } from 'redux-actions'
import {
  HIDE_OVERLAY,
  SHOW_OVERLAY,
  SHOW_FINISH_SCREEN,
  CLOSE_FINISH_SCREEN,
  INIT
} from './reducers/types'

export const hideOverlay = createAction(HIDE_OVERLAY)
export const showOverlay = createAction(SHOW_OVERLAY)
export const closeFinishScreen = createAction(CLOSE_FINISH_SCREEN)
export const showFinishScreen = createAction(SHOW_FINISH_SCREEN)
export const init = createAction(INIT)
