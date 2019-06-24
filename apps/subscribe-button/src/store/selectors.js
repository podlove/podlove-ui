import * as config from './reducers/config'
import * as metadata from './reducers/metadata'
import { selectors as viewSelectors } from './reducers/view'
import { selectors as themeSelectors } from './reducers/theme'
import { selectors as finishSelectors } from './reducers/finish'
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
  finish: propOr({}, 'finish')
}

export const selectColor = compose(
  config.color,
  configSlice
)
export const selectCover = compose(
  config.cover,
  configSlice
)
export const selectFormat = compose(
  config.format,
  configSlice
)
export const selectSize = compose(
  config.size,
  configSlice
)
export const selectStyle = compose(
  config.style,
  configSlice
)

export const selectTitle = compose(
  metadata.title,
  metadataSlice
)

export const selectSubTitle = compose(
  metadata.subtitle,
  metadataSlice
)

export const selectDescription = compose(
  metadata.description,
  metadataSlice
)

export const selectFeed = compose(
  metadata.feed,
  metadataSlice
)

export const headless = compose(
  config.headless,
  configSlice
)

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
  fontRegular: compose(
    fontString,
    themeSelectors.fontRegular,
    slices.theme
  ),
  fontBold: compose(
    fontString,
    themeSelectors.fontBold,
    slices.theme
  ),
  fontCi: compose(
    fontString,
    themeSelectors.fontCi,
    slices.theme
  )
}

export const view = scope(viewSelectors, slices.view)

export const finish = scope(finishSelectors, slices.finish)
