import { prop } from 'ramda'
import { handleActions } from 'redux-actions'

import { SHOW_OVERLAY, HIDE_OVERLAY } from './types'

export const INITIAL_STATE = {
  overlay: false
}

export const reducer = handleActions(
  {
    [SHOW_OVERLAY]: state => ({ ...state, overlay: true }),
    [HIDE_OVERLAY]: state => ({ ...state, overlay: false })
  },
  INITIAL_STATE
)

export const overlay = prop('overlay')
