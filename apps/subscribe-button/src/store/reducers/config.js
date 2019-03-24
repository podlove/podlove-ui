import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { INIT } from './types'

export const INIT_STATE = {
  size: 'big',
  color: '#c90bd6',
  format: 'cover',
  style: 'filled',
  cover: 'https://meta.metaebene.me/media/podlove/podlove-logo-2.0-512x512.jpg'
}

export const reducer = handleActions({ [INIT]: (state, { payload }) => ({ ...state, ...payload }) }, INIT_STATE)

export const color = prop('color')
export const cover = prop('cover')
export const format = prop('format')
export const size = prop('size')
export const style = prop('style')
