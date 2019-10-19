import { handleActions } from 'redux-actions'
import {
  CONSTRUCTED,
  BACKEND_LOADING_END,
  BACKEND_END,
  RESTORE,
  BACKEND_PLAYTIME
} from '@podlove/player-actions/types'

const INITIAL_STATE = 'initialized'

export const reducer = handleActions(
  {
    [CONSTRUCTED]: () => 'initialized',
    [BACKEND_LOADING_END]: () => 'active',
    [BACKEND_PLAYTIME]: () => 'active',
    [RESTORE]: () => 'active',
    [BACKEND_END]: () => 'ended'
  },
  INITIAL_STATE
)
