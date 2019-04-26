import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as metadata } from './metadata'
import { reducer as tab } from './tab'

export default combineReducers({ config, metadata, tab })
