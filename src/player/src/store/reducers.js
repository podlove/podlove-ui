import { combineReducers } from 'redux'

import { reducer as runtime } from '@podlove/state/runtime'
import { reducer as theme } from '@podlove/state/theme'
import { reducer as episode } from '@podlove/state/episode'
import { reducer as chapters } from '@podlove/state/chapters'
import { reducer as timepiece } from '@podlove/state/timepiece'
import { reducer as show } from '@podlove/state/show'

export default combineReducers({
  runtime,
  theme,
  show,
  episode,
  chapters,
  timepiece
})
