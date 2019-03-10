import { handleActions } from 'redux-actions'

import { SELECT_CONTENT} from '@podlove/player-actions/types'

export const INITIAL_STATE = 'episode'

const update = (state, content) => ['show', 'episode', 'chapter', 'time'].includes(content) ? content : state

export const reducer = handleActions({
  [SELECT_CONTENT]: (state, { payload }) => update(state, payload)
}, INITIAL_STATE)
