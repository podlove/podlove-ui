import { handleActions } from 'redux-actions'
import { propOr } from 'ramda'

import { INIT } from '@podlove/player-actions/types'

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [INIT]: (_, { payload }) => propOr([], 'contributors', payload)
  },
  INITIAL_STATE
)
