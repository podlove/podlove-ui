import { handleActions } from 'redux-actions'

import { SELECT_EMBED_SIZE } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  available: ['250x400', '320x400', '375x400', '600x290', '768x290'],
  size: '320x400'
}

const update = (state, payload) => state.available.includes(payload) ? payload : state.size

export const reducer = handleActions({
  [SELECT_EMBED_SIZE]: (state, { payload }) => ({
    ...state,
    size: update(state, payload)
  })
}, INITIAL_STATE)
