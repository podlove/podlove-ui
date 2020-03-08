import { prop, compose, propOr } from 'ramda'

const themeColors = propOr({}, 'tokens')

export const brand = compose(prop('brand'), themeColors)
export const brandDark = compose(prop('brandDark'), themeColors)
export const brandDarkest = compose(prop('brandDarkest'), themeColors)
export const brandLightest = compose(prop('brandLightest'), themeColors)
export const shadeDark = compose(prop('shadeDark'), themeColors)
export const shadeBase = compose(prop('shadeBase'), themeColors)
export const contrast = compose(prop('contrast'), themeColors)
export const alt = compose(prop('alt'), themeColors)

const themeFonts = propOr({}, 'fonts')

export const fontRegular = compose(prop('regular'), themeFonts)
export const fontBold = compose(prop('bold'), themeFonts)
export const fontCi = compose(prop('ci'), themeFonts)
