import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT, TOGGLE_TAB } from './types'

export const INITIAL_STATE = {
  apps: true,
  cloud: false,
  platform: false,
  info: false
}

export const reducer = handleActions(
  {
    [INIT]: (state, { payload }) => ({ ...state, ...payload }),
    [TOGGLE_TAB]: (state, { payload }) => ({
      ...{
        apps: false,
        cloud: false,
        platform: false,
        info: false
      },
      ...payload
    })
  },
  INITIAL_STATE
)

export const apps = prop('apps')
export const cloud = prop('cloud')
export const platform = prop('platform')
export const info = prop('info')
