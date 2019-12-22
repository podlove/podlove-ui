import { handleActions } from 'redux-actions'
import { prop } from 'ramda'

import { READY, FILE_HOVER } from '@podlove/player-actions/types'
import { files } from '@podlove/player-config'

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [READY]: (_, { payload }) => files(payload).map(file => ({ ...file, hover: false })),
    [FILE_HOVER]: (state, { payload }) =>
      state.map(file => ({ ...file, hover: file.url === prop('url', payload) }))
  },
  INITIAL_STATE
)
