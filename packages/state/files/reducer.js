import { propOr, compose, filter } from 'ramda'
import { handleActions } from 'redux-actions'

import { INIT } from '@podlove/actions/types'
import { createObject } from '@podlove/utils/helper'

export const INIT_STATE = {
  audio: []
}

const audioFiles = ({ mimeType }) => mimeType.includes('audio')

const update = createObject({
  audio: compose(filter(audioFiles), propOr([], 'files'))
})

export const reducer = handleActions({
  [INIT]: (state, { payload }) => ({
    ...state,
    ...update(payload)
  })
}, INIT_STATE)
