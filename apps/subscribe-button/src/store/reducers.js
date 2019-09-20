import { combineReducers } from 'redux'

import { reducer as view } from '@podlove/button-state/view'
import { reducer as clients } from '@podlove/button-state/clients'
import { reducer as theme } from '@podlove/button-state/theme'
import { reducer as finish } from '@podlove/button-state/finish'

export default combineReducers({ view, clients, theme, finish })
