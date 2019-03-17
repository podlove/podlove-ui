import { handleActions } from 'redux-actions'

import { media } from '@podlove/utils/config'
import { INIT } from '@podlove/player-actions/types'

export const INIT_STATE = []

export const reducer = handleActions(
  {
    [INIT]: (_, { payload }) => media(payload)
  },
  INIT_STATE
)
