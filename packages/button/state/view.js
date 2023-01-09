import { prop } from 'ramda'
import { handleActions } from 'redux-actions/es'

import {
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SHOW_LIST,
  SHOW_FINISH_CARD
} from '@podlove/button-actions/types'

export const INITIAL_STATE = {
  overlay: false,
  finish: false,
  list: true
}

export const reducer = handleActions(
  {
    [SHOW_LIST]: (state) => ({ ...state, finish: false, list: true }),
    [SHOW_OVERLAY]: (state) => ({ ...state, overlay: true }),
    [HIDE_OVERLAY]: (state) => ({ ...state, overlay: false, finish: false, list: true }),
    [SHOW_FINISH_CARD]: (state) => ({ ...state, list: false, finish: true })
  },
  INITIAL_STATE
)

export const selectors = {
  overlay: prop('overlay'),
  finish: prop('finish'),
  list: prop('list')
}
