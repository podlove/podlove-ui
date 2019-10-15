import { handleActions } from 'redux-actions'
import { READY, CONSTRUCTED, INIT } from '@podlove/player-actions/types'

export const INITIAL_STATE = null

export const reducer = handleActions(
  {
    [CONSTRUCTED]: () => 'constructed',
    [INIT]: () => 'init',
    [READY]: () => 'ready'
  },
  INITIAL_STATE
)
