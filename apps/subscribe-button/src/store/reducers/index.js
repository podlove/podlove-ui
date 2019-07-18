import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as metadata } from './metadata'
import { reducer as view } from './view'

export default combineReducers({ config, metadata, view })
