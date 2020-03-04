import { compose, propOr, path } from 'ramda'
import { handleActions } from 'redux-actions'
import { createObject } from '@podlove/utils/helper'

import { theme } from '@podlove/player-config'
import { SET_THEME, CONSTRUCTED } from '@podlove/player-actions/types'

const TOKENS = {
  brand: '#E64415',
  brandDark: '#235973',
  brandDarkest: '#1A3A4A',
  brandLightest: '#E9F1F5',
  shadeDark: '#807E7C',
  shadeBase: '#807E7C',
  contrast: '#000',
  alt: '#fff'
}

export const tokens = {
  brand: propOr(TOKENS.brand, 'brand'),
  brandDark: propOr(TOKENS.brandDark, 'brandDark'),
  brandDarkest: propOr(TOKENS.brandDarkest, 'brandDarkest'),
  brandLightest: propOr(TOKENS.brandLightest, 'brandLightest'),
  shadeDark: propOr(TOKENS.shadeDark, 'shadeDark'),
  shadeBase: propOr(TOKENS.shadeBase, 'shadeBase'),
  contrast: propOr(TOKENS.contrast, 'contrast'),
  alt: propOr(TOKENS.alt, 'alt')
}

export const FONTS = {
  ci: {
    name: 'ci',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 800
  },
  regular: {
    name: 'regular',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 300
  },
  bold: {
    name: 'bold',
    family: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji", "Segoe UI Symbol'
    ],
    src: [],
    weight: 700
  }
}

const normalizeFont = type =>
  createObject({
    family: propOr(path([type, 'family'], FONTS), 'family'),
    weight: propOr(path([type, 'weight'], FONTS), 'weight'),
    name: propOr(path([type, 'name'], FONTS), 'name'),
    src: propOr([], 'src')
  })

const extractFonts = createObject({
  regular: compose(
    normalizeFont('regular'),
    propOr(FONTS.regular, 'regular'),
    propOr({}, 'fonts'),
    theme
  ),
  bold: compose(normalizeFont('bold'), propOr(FONTS.bold, 'bold'), propOr({}, 'fonts'), theme),
  ci: compose(normalizeFont('ci'), propOr(FONTS.ci, 'ci'), propOr({}, 'fonts'), theme)
})

const getTokens = propOr({}, 'tokens')

const extractTokens = createObject({
  brand: compose(tokens.brand, getTokens, theme),
  brandDark: compose(tokens.brandDark, getTokens, theme),
  brandDarkest: compose(tokens.brandDarkest, getTokens, theme),
  brandLightest: compose(tokens.brandLightest, getTokens, theme),
  shadeDark: compose(tokens.shadeDark, getTokens, theme),
  shadeBase: compose(tokens.shadeBase, getTokens, theme),
  contrast: compose(tokens.contrast, getTokens, theme),
  alt: compose(tokens.alt, getTokens, theme)
})

export const INITIAL_STATE = {
  tokens: TOKENS,
  fonts: FONTS
}

export const reducer = handleActions(
  {
    [CONSTRUCTED]: (_, { payload }) => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    }),
    [SET_THEME]: (_, { payload }) => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    })
  },
  INITIAL_STATE
)
