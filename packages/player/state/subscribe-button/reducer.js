import { prop } from 'ramda'
import { handleActions } from 'redux-actions'
import { CONSTRUCTED } from '@podlove/player-actions/types'

export const INITIAL_STATE = false

export const reducer = handleActions(
  {
    [CONSTRUCTED]: (_, { payload }) => !!prop('subscribe-button', payload)
  },
  INITIAL_STATE
)
