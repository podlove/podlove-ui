import { prop } from 'ramda'
import { handleActions } from 'redux-actions'

import { HIDE_OVERLAY, SHOW_FINISH_CARD } from '@podlove/button-actions/types'

export const INITIAL_STATE = {
  icon: null,
  install: null,
  title: null,
  link: null,
  os: null,
  rss: null,
  type: null
}

export const reducer = handleActions(
  {
    [SHOW_FINISH_CARD]: (_, { payload }) => payload,
    [HIDE_OVERLAY]: () => INITIAL_STATE
  },
  INITIAL_STATE
)

export const selectors = {
  overlay: prop('install'),
  finish: prop('title'),
  icon: prop('icon'),
  link: prop('link'),
  os: prop('os'),
  rss: prop('rss'),
  type: prop('type'),
  install: prop('install')
}
