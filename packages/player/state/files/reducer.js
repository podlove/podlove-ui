import { handleActions } from 'redux-actions'

import { READY } from '@podlove/player-actions/types'
import { files } from '@podlove/player-config'

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => files(payload)
  },
  INITIAL_STATE
)
