import { createAction } from 'redux-actions'
import {
  HIDE_OVERLAY,
  SHOW_OVERLAY,
  SHOW_FINISH_SCREEN,
  CLOSE_FINISH_SCREEN,
  FILL_FINISH_OBJECT,
  RESET_FINISH_OBJECT,
  INIT
} from './reducers/types'

export const hideOverlay = createAction(HIDE_OVERLAY)
export const showOverlay = createAction(SHOW_OVERLAY)
export const closeFinishScreen = createAction(CLOSE_FINISH_SCREEN)
export const showFinishScreen = createAction(SHOW_FINISH_SCREEN)
export const fillFinishObject = createAction(FILL_FINISH_OBJECT)
export const resetFinishObject = createAction(RESET_FINISH_OBJECT)
export const init = createAction(INIT)
