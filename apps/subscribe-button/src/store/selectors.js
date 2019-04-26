import * as config from './reducers/config'
import * as metadata from './reducers/metadata'
import * as tab from './reducers/tab'
import { propOr, compose } from 'ramda'

export const configSlice = propOr({}, 'config')
export const metadataSlice = propOr({}, 'metadata')
export const tabSlice = propOr({}, 'tab')

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

export const selectApps = compose(
  tab.apps,
  tabSlice
)

export const selectCloud = compose(
  tab.cloud,
  tabSlice
)

export const selectPlatform = compose(
  tab.platform,
  tabSlice
)

export const selectInfo = compose(
  tab.info,
  tabSlice
)
