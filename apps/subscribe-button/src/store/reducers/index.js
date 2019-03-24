import { combineReducers } from 'redux'
import * as test from './test'

export default combineReducers({ test: test.reducer })
