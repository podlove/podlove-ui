import { handleActions } from 'redux-actions'
import { compose } from 'ramda'

import { inRange } from '@podlove/utils/math'
import { toFloat } from '@podlove/utils/helper'

import { SET_VOLUME, MUTE, UNMUTE, SET_RATE } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  volume: 1,
  muted: false,
  rate: 1
}

const inVolumeRange = compose(inRange(0, INITIAL_STATE.volume), toFloat)
const inRateRange = compose(inRange(0.5, 4), toFloat)

export const reducer = handleActions(
  {
    [SET_VOLUME]: (state, { payload }) => ({
      ...state,
      volume: inVolumeRange(payload)
    }),

    [MUTE]: state => ({
      ...state,
      muted: true
    }),

    [UNMUTE]: state => ({
      ...state,
      muted: false
    }),

    [SET_RATE]: (state, { payload }) => ({
      ...state,
      rate: inRateRange(payload)
    })
  },
  INITIAL_STATE
)
