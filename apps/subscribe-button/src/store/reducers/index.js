import { combineReducers } from 'redux'

import { reducer as metadata } from './metadata'
import { reducer as view } from './view'
import { reducer as clients } from './clients'
import { reducer as theme } from './theme'
import { reducer as finish } from './finish'

export default combineReducers({ metadata, view, clients, theme, finish })
