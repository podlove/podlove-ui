import { handleActions } from 'redux-actions'
import { head, findIndex } from 'ramda'

import { LOAD_QUANTILES, SET_QUANTILE } from '@podlove/player-actions/types'

const findQuantile = (quantiles = [], start) =>
  findIndex((quantile) => head(quantile) === start, quantiles)

const newQuantile = (quantiles = [], quantile) => [...quantiles, quantile]

const updateQuantile = (quantiles = [], index, quantile) => [
  ...quantiles.slice(0, index),
  quantile,
  ...quantiles.slice(index + 1)
]

export const INITIAL_STATE = []

export const reducer = handleActions(
  {
    [LOAD_QUANTILES]: (_, { payload }) => payload,
    [SET_QUANTILE]: (state, { payload }) => {
      const index = findQuantile(state, payload.start)
      const currentQuantile = [payload.start, payload.end]

      if (index < 0) {
        return newQuantile(state, currentQuantile)
      }

      return updateQuantile(state, index, currentQuantile)
    }
  },
  INITIAL_STATE
)
