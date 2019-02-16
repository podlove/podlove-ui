import { compose, propOr, prop, gt } from 'ramda'
import color from 'color'
import { handleActions } from 'redux-actions'
import { createObject } from '@podlove/utils/helper'

import { INIT, SET_THEME } from '@podlove/actions/types'

export const INITIAL_STATE = {
  main: '#2B8AC6',
  highlight: null,
  light: '#fff',
  dark: '#000',
  grey: '#333',
  luminosity: null,
  negative: false
}

const main = propOr('#2B8AC6', 'main')
const highlight = prop('highlight')
const luminosity = compose(input => color(input).luminosity(), main)
const negative = compose(gt(0.25), luminosity)

const themeColors = createObject({
  main,
  highlight,
  luminosity,
  negative
})

const update = compose(
  themeColors,
  propOr({}, 'theme')
)

export const reducer = handleActions({
  [INIT]: (state, { payload }) => ({
    ...state,
    ...update(payload)
  }),

  [SET_THEME]: (state, { payload }) => ({
    ...state,
    ...update(payload)
  })
}, INITIAL_STATE)
