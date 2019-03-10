import { handleActions } from 'redux-actions'
import { propOr } from 'ramda'

import { INIT, TOGGLE_TAB } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  chapters: false,
  audio: false,
  share: false,
  files: false,
  info: false,
  transcripts: false
}

export const reducer = handleActions({
  [INIT]: (_, { payload }) => ({
    ...INITIAL_STATE,
    ...propOr(null, 'tabs', payload)
  }),

  [TOGGLE_TAB]: (state, { payload }) => ({
    ...INITIAL_STATE,
    [payload]: !propOr(false, payload, state)
  })
}, INITIAL_STATE)
