import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT, TOGGLE_TAB } from './types'

export const INITIAL_STATE = {
  apps: false,
  cloud: false,
  platform: false,
  info: true
}

export const reducer = handleActions(
  {
    [INIT]: (state, { payload }) => ({ ...state, ...payload }),
    [TOGGLE_TAB]: (state, { payload }) => ({ ...state, ...payload })
  },
  INITIAL_STATE
)

export const apps = prop('apps')
export const cloud = prop('cloud')
export const platform = prop('platform')
export const info = prop('info')
