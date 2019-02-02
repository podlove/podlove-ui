import { propOr } from 'ramda'

export const mainColor = propOr('#fff', 'main')
export const lightColor = propOr('#fff', 'light')
export const darkColor = propOr('#000', 'dark')
export const highlightColor = propOr(null, 'highlight')
export const isNegative = propOr(false, 'negative')
export const luminosity = propOr(false, 'luminosity')
