import { combineReducers } from 'redux'

import { reducer as runtime } from '@podlove/player-state/runtime'
import { reducer as theme } from '@podlove/player-state/theme'
import { reducer as episode } from '@podlove/player-state/episode'

export default combineReducers({
  runtime,
  theme,
  episode
})
