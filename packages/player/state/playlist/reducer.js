import { handleActions } from 'redux-actions'
import { READY, SELECT_PLAYLIST_ENTRY } from '@podlove/player-actions/types'
import { playlist } from '@podlove/player-config'
import { toPlayerTime } from '@podlove/utils/time'

const INITIAL_STATE = null

const active = (state, payload) =>
  state.map((item, index) => ({ ...item, active: payload === index }))

export const reducer = handleActions(
  {
    [READY]: (state, { payload }) =>
      state ||
      playlist(payload).map(item => ({
        ...item,
        duration: toPlayerTime(item.duration),
        active: false
      })),
    [SELECT_PLAYLIST_ENTRY]: (state, { payload: { index: index } }) => state && active(state, index)
  },
  INITIAL_STATE
)
