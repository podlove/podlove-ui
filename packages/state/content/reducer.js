import { handleActions } from 'redux-actions'

import { SET_SHARE_CONTENT } from '@podlove/actions/types'

export const INITIAL_STATE = 'episode'

const update = (state, content) => ['show', 'episode', 'chapter', 'time'].includes(content) ? content : state

export const reducer = handleActions({
  [SET_SHARE_CONTENT]: (state, { payload }) => update(state, payload)
}, INITIAL_STATE)
