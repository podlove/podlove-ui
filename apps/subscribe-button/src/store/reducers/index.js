import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as metadata } from './metadata'

export default combineReducers({ config, metadata })
