import { createAction } from 'redux-actions'
import { SHOW_FINISH_CARD, HIDE_FINISH_CARD } from './types'

export type hidePayload = void;
export type showPayload = void;

export const hide = createAction<hidePayload>(HIDE_FINISH_CARD)
export const show = createAction<showPayload>(SHOW_FINISH_CARD)
