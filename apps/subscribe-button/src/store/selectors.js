import * as config from './reducers/config'

export const selectColor = state => config.color(state.color)
export const selectFormat = state => config.format(state.format)
export const selectSize = state => config.size(state.size)
export const selectStyle = state => config.style(state.config)
