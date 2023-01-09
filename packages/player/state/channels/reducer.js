import { handleActions } from 'redux-actions/es'
import { READY } from '@podlove/player-actions/types'
import { channels } from '@podlove/player-config'

export const INITIAL_STATE = [
  'facebook',
  'twitter',
  'whats-app',
  'linkedin',
  'pinterest',
  'xing',
  'mail',
  'link'
]

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => channels(payload)
  },
  INITIAL_STATE
)
