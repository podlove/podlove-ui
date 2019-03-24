import * as config from './reducers/config'

export const selectStyle = state => config.style(state.config)
