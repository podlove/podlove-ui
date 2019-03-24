import * as config from './reducers/config'
import { propOr, compose } from 'ramda'

export const configSlice = propOr({}, 'config')

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
