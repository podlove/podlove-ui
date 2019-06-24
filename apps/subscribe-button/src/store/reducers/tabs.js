import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT, TOGGLE_TAB } from './types'

export const INITIAL_STATE = {
  apps: true,
  web: false,
  info: false
}

export const reducer = handleActions(
  {
    [INIT]: (state, { payload }) => ({ ...state, ...payload }),
    [TOGGLE_TAB]: (state, { payload }) => ({
      ...{
        apps: false,
        web: false,
        info: false
      },
      ...payload
    })
  },
  INITIAL_STATE
)

export const apps = prop('apps')
export const web = prop('web')
export const info = prop('info')
