import { createAction } from 'redux-actions'
import { SHOW_FINISH_CARD, HIDE_FINISH_CARD } from './types'

export const hide = createAction(HIDE_FINISH_CARD)
export const show = createAction(SHOW_FINISH_CARD)
