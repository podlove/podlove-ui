import { propOr, compose, filter } from 'ramda'
import { handleActions } from 'redux-actions'

import { INIT } from '@podlove/player-actions/types'
import { createObject } from '@podlove/utils/helper'

export const INITIAL_STATE = {
  audio: []
}

const audioFiles = ({ mimeType }) => mimeType.includes('audio')

const update = createObject({
  audio: compose(
    filter(audioFiles),
    propOr([], 'files')
  )
})

export const reducer = handleActions(
  {
    [INIT]: (state, { payload }) => ({
      ...state,
      ...update(payload)
    })
  },
  INITIAL_STATE
)
