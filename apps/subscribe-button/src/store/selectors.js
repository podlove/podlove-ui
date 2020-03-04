import * as config from '@podlove/button-state/config'
import { selectors as viewSelectors } from '@podlove/button-state/view'
import { selectors as themeSelectors } from '@podlove/button-state/theme'
import { selectors as finishSelectors } from '@podlove/button-state/finish'
import { selectors as runtimeSelectors } from '@podlove/button-state/runtime'
import { propOr, compose } from 'ramda'
import { scope } from '@podlove/utils/helper'

export const configSlice = propOr({}, 'config')
export const metadataSlice = propOr({}, 'metadata')
export const viewSlice = propOr({}, 'view')
export const clients = propOr([], 'clients')

export const slices = {
  config: propOr({}, 'config'),
  theme: propOr({}, 'theme'),
  view: propOr({}, 'view'),
  finish: propOr({}, 'finish'),
  feed: propOr({}, 'feed'),
  runtime: propOr({}, 'runtime')
}

export const selectColor = compose(config.color, configSlice)
export const selectCover = compose(config.cover, configSlice)
export const selectFormat = compose(config.format, configSlice)
export const selectSize = compose(config.size, configSlice)
export const selectStyle = compose(config.style, configSlice)

export const headless = compose(config.headless, configSlice)

const fontString = ({ weight = 300, family = [] } = {}) => ({
  'font-family': family.map(font => `"${font}"`).join(', '),
  'font-weight': weight
})

export const theme = {
  ...scope(themeSelectors, slices.theme),
  fonts: compose(
    state => [
      themeSelectors.fontRegular(state),
      themeSelectors.fontBold(state),
      themeSelectors.fontCi(state)
    ],
    slices.theme
  ),
  fontRegular: compose(fontString, themeSelectors.fontRegular, slices.theme),
  fontBold: compose(fontString, themeSelectors.fontBold, slices.theme),
  fontCi: compose(fontString, themeSelectors.fontCi, slices.theme)
}

export const view = scope(viewSelectors, slices.view)

export const finish = scope(finishSelectors, slices.finish)

export const runtime = scope(runtimeSelectors, slices.runtime)

export const feed = slices.feed
