import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as meta_data } from './metadata'

export default combineReducers({ config, meta_data })
