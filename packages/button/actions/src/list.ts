import { createAction } from 'redux-actions'
import { SHOW_LIST, HIDE_LIST } from './types'

export type hidePayload = void;
export type showPayload = void;

export const hide = createAction<hidePayload>(HIDE_LIST)
export const show = createAction<showPayload>(SHOW_LIST)
