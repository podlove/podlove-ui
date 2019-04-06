import { handleActions } from 'redux-actions'
import { prop } from 'ramda'
import { SET_METADATA } from './types'

export const INITIAL_STATE = {
  title: '',
  subtitle: '',
  description: '',
  feed: []
}

export const reducer = handleActions(
  {
    [SET_METADATA]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  INITIAL_STATE
)

export const title = prop('title')
export const subtitle = prop('subtitle')
export const description = prop('description')
export const feed = prop('feed')
