import { prop, compose, propOr, path } from 'ramda'
import { handleActions } from 'redux-actions'
import { createObject } from '@podlove/utils/helper'
import { INIT } from '@podlove/button-actions/types'

const theme = propOr({}, 'theme')

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
    [INIT]: (_, { payload }) => ({
      tokens: extractTokens(payload),
      fonts: extractFonts(payload)
    })
  },
  INITIAL_STATE
)

const themeColors = propOr({}, 'tokens')
const themeFonts = propOr({}, 'fonts')

export const selectors = {
  brand: compose(prop('brand'), themeColors),
  brandDark: compose(prop('brandDark'), themeColors),
  brandDarkest: compose(prop('brandDarkest'), themeColors),
  brandLightest: compose(prop('brandLightest'), themeColors),
  shadeDark: compose(prop('shadeDark'), themeColors),
  shadeBase: compose(prop('shadeBase'), themeColors),
  contrast: compose(prop('contrast'), themeColors),
  alt: compose(prop('alt'), themeColors),
  fontRegular: compose(prop('regular'), themeFonts),
  fontBold: compose(prop('bold'), themeFonts),
  fontCi: compose(prop('ci'), themeFonts)
}
