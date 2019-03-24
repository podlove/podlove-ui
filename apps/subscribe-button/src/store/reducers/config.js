import { handleActions } from 'redux-actions'
import { INIT } from './types'

export const INIT_STATE = {
  size: 'big',
  color: '#c90bd6',
  format: 'cover',
  style: 'filled'
}

export const reducer = handleActions({ [INIT]: (state, { payload }) => ({ ...state, ...payload }) }, INIT_STATE)

export const style = state => state.style
