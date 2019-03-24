import { handleActions } from 'redux-actions'

export const INIT_STATE = {
  title: null,
  number: 0
}

export const reducer = handleActions({ foo: (state, action) => state }, INIT_STATE)
