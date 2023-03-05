import { pathOr, compose } from 'ramda'
import { handleActions } from 'redux-actions'
import { sanitize } from '@podlove/utils/dom'
import { createObject } from '@podlove/utils/helper'

import { READY } from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  title: null,
  subtitle: null,
  summary: null,
  poster: null,
  link: null
}

const change = createObject({
  title: pathOr(null, ['show', 'title']),
  subtitle: pathOr(null, ['show', 'subtitle']),
  summary: compose(sanitize, pathOr(null, ['show', 'summary'])),
  link: pathOr(null, ['show', 'link']),
  poster: pathOr(null, ['show', 'poster'])
})

export const reducer = handleActions(
  {
    [READY]: (state, { payload }) => ({
      ...state,
      ...change(payload)
    })
  },
  INITIAL_STATE
)
