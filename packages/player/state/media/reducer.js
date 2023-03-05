import { handleActions } from 'redux-actions'

import { media } from '@podlove/player-config'
import { READY } from '@podlove/player-actions/types'

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => media(payload)
  },
  INITIAL_STATE
)
