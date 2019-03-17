import { handleActions } from 'redux-actions'
import { INIT } from '@podlove/player-actions/types'
import { shareReference, originReference, configReference } from '@podlove/utils/config'

export const INITIAL_STATE = {
  config: null,
  share: null,
  origin: null
}

export const reducer = handleActions(
  {
    [INIT]: (_, { payload }) => ({
      config: configReference(payload),
      share: shareReference(payload),
      origin: originReference(payload)
    })
  },
  INITIAL_STATE
)
