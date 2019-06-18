import * as config from './reducers/config'
import * as metadata from './reducers/metadata'
import * as view from './reducers/view'
import * as tabsreducer from './reducers/tabs'
import { propOr, compose } from 'ramda'

import { createObject } from '@podlove/utils/helper'

export const configSlice = propOr({}, 'config')
export const metadataSlice = propOr({}, 'metadata')
export const tabSlice = propOr({}, 'tabs')
export const viewSlice = propOr({}, 'view')

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

export const selectOverlayVisible = compose(
  view.overlay,
  viewSlice
)

export const tabs = createObject({
  apps: compose(
    tabsreducer.apps,
    tabSlice
  ),
  cloud: compose(
    tabsreducer.cloud,
    tabSlice
  ),
  platform: compose(
    tabsreducer.platform,
    tabSlice
  ),
  info: compose(
    tabsreducer.info,
    tabSlice
  )
})
