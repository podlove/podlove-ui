import { handleActions } from 'redux-actions'
import {
  READY,
  SELECT_PLAYLIST_ENTRY,
  MARK_PLAYLIST_ENTRY_ACTIVE
} from '@podlove/player-actions/types'
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
        active: !!item.active
      })),
    [SELECT_PLAYLIST_ENTRY]: (state, { payload: { index: index } }) =>
      state && active(state, index),
    [MARK_PLAYLIST_ENTRY_ACTIVE]: (state, { payload }) => state && active(state, payload)
  },
  INITIAL_STATE
)
