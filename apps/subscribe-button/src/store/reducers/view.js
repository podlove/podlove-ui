import { prop } from 'ramda'
import { handleActions } from 'redux-actions'

import {
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SHOW_FINISH_SCREEN,
  CLOSE_FINISH_SCREEN,
  FILL_FINISH_OBJECT,
  RESET_FINISH_OBJECT
} from './types'

export const INITIAL_STATE = {
  overlay: false,
  finish: false,
  finish_object: null
}

export const reducer = handleActions(
  {
    [SHOW_OVERLAY]: state => ({ ...state, overlay: true }),
    [HIDE_OVERLAY]: state => ({ ...state, overlay: false, finish: false, finish_object: null }),
    [SHOW_FINISH_SCREEN]: state => ({ ...state, finish: true }),
    [CLOSE_FINISH_SCREEN]: state => ({ ...state, finish: false }),
    [FILL_FINISH_OBJECT]: (state, { payload }) => ({ ...state, ...payload }),
    [RESET_FINISH_OBJECT]: state => ({ ...state, finish_object: null })
  },
  INITIAL_STATE
)

export const overlay = prop('overlay')
export const finish = prop('finish')
export const finish_object = prop('finish_object')
