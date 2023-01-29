import { handleActions } from 'redux-actions'
import { identity } from 'ramda'
import { INIT } from '@podlove/button-actions/types'
import * as config from '@podlove/button-config'

export const INIT_STATE = null

export const reducer = handleActions(
  { [INIT]: (state, { payload }) => config.feed(payload) || state },
  INIT_STATE
)

export const selectors = {
  feed: identity
}
