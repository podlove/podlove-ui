import { handleActions } from 'redux-actions'
import { READY } from '@podlove/player-actions/types'
import {
  shareReference,
  originReference,
  episodeReference,
  configReference
} from '@podlove/player-config'

export const INITIAL_STATE = {
  config: null,
  share: null,
  origin: null,
  episode: null
}

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => ({
      episode: episodeReference(payload),
      config: configReference(payload),
      share: shareReference(payload),
      origin: originReference(payload)
    })
  },
  INITIAL_STATE
)
