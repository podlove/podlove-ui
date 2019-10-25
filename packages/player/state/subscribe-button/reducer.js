import { handleActions } from 'redux-actions'
import { CONSTRUCTED } from '@podlove/player-actions/types'
import * as config from '@podlove/player-config'

export const INITIAL_STATE = false

export const reducer = handleActions(
  {
    [CONSTRUCTED]: (_, { payload }) => !!config.subscribeButton(payload)
  },
  INITIAL_STATE
)
