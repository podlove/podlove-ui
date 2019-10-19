import { handleActions } from 'redux-actions'
import { propOr } from 'ramda'

import { READY } from '@podlove/player-actions/types'

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => propOr([], 'contributors', payload)
  },
  INITIAL_STATE
)
