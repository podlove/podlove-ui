import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT } from '@podlove/button-actions/types'

export const INIT_STATE = {
  size: 'big',
  color: '#c90bd6',
  format: 'cover',
  style: 'filled',
  headless: true,
  cover: null
}

export const reducer = handleActions(
  { [INIT]: (state, { payload }) => ({ ...state, ...payload }) },
  INIT_STATE
)

export const color = prop('color')
export const cover = prop('cover')
export const format = prop('format')
export const size = prop('size')
export const style = prop('style')
export const headless = prop('headless')
