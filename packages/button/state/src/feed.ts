import { Action, handleActions } from 'redux-actions'
import { identity } from 'ramda'
import * as config from '@podlove/button-config'
import { init, initPayload } from '@podlove/button-actions/lifecycle'

export const INIT_STATE = null

export type State = null | string;

export const reducer = handleActions<State, initPayload>(
  { [init.toString()]: (state, { payload }: Action<initPayload>): State => config.feed(payload) || state },
  INIT_STATE
)

export const selectors = {
  feed: identity as (input: State) => string
}
