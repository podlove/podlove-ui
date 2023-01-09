import { handleActions } from 'redux-actions/es'
import { propOr } from 'ramda'

import { TOGGLE_TAB } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  chapters: false,
  share: false,
  files: false,
  shownotes: false,
  playlist: false,
  transcripts: false
}

export const reducer = handleActions(
  {
    [TOGGLE_TAB]: (state, { payload }) => ({
      ...INITIAL_STATE,
      [payload]: !propOr(false, payload, state)
    })
  },
  INITIAL_STATE
)
