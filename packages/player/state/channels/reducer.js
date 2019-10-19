import { handleActions } from 'redux-actions'
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
    [READY]: (state, { payload }) => {
      const available = channels(payload)

      if (available.length > 0) {
        return available
      }

      return state
    }
  },
  INITIAL_STATE
)
