import * as config from './reducers/config'
import * as metadata from './reducers/metadata'
import { propOr, compose } from 'ramda'

export const configSlice = propOr({}, 'config')
export const metadataSlice = propOr({}, 'metadata')

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
