import { prop } from 'ramda'
import { handleActions } from 'redux-actions'

import { SHOW_OVERLAY, HIDE_OVERLAY, SHOW_FINISH_SCREEN, CLOSE_FINISH_SCREEN } from './types'

export const INITIAL_STATE = {
  overlay: false,
  finish: false,
  finish_object: null
}

export const reducer = handleActions(
  {
    [SHOW_OVERLAY]: state => ({ ...state, overlay: true }),
    [HIDE_OVERLAY]: state => ({ ...state, overlay: false, finish: false, finish_object: null }),
    [SHOW_FINISH_SCREEN]: (state, { payload }) => ({ ...state, finish: true, ...payload }),
    [CLOSE_FINISH_SCREEN]: state => ({ ...state, finish: false, finish_object: null })
  },
  INITIAL_STATE
)

export const overlay = prop('overlay')
export const finish = prop('finish')
export const finish_object = prop('finish_object')
