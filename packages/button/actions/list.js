import { createAction } from 'redux-actions'
import { SHOW_LIST, HIDE_LIST } from './types'

export const hide = createAction(HIDE_LIST)
export const show = createAction(SHOW_LIST)
