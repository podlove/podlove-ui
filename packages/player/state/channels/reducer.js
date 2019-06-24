import { handleActions } from 'redux-actions'
import { READY } from '@podlove/player-actions/types'
import { channels } from '@podlove/utils/config'

export const INITIAL_STATE = ['facebook', 'twitter', 'mail', 'link']

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
