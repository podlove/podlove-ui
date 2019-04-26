import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as metadata } from './metadata'
import { reducer as tabs } from './tabs'

export default combineReducers({ config, metadata, tabs })
