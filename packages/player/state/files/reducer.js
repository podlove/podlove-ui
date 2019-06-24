import { compose, filter } from 'ramda'
import { handleActions } from 'redux-actions'

import { READY } from '@podlove/player-actions/types'
import { createObject } from '@podlove/utils/helper'
import { files } from '@podlove/utils/config'

export const INITIAL_STATE = {
  audio: []
}

const audioFiles = ({ mimeType }) => mimeType.includes('audio')

const update = createObject({
  audio: compose(
    filter(audioFiles),
    files
  )
})

export const reducer = handleActions(
  {
    [READY]: (state, { payload }) => ({
      ...state,
      ...update(payload)
    })
  },
  INITIAL_STATE
)
