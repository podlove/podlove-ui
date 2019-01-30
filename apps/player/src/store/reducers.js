import { combineReducers } from 'redux'

import { reducer as runtime } from '@podlove/state/runtime'
import { reducer as theme } from '@podlove/state/theme'
import { reducer as episode } from '@podlove/state/episode'
import { reducer as chapters } from '@podlove/state/chapters'
import { reducer as timepiece } from '@podlove/state/timepiece'
import { reducer as show } from '@podlove/state/show'
import { reducer as media } from '@podlove/state/media'
import { reducer as components } from '@podlove/state/components'
import { reducer as ghost } from '@podlove/state/ghost'
import { reducer as network } from '@podlove/state/network'
import { reducer as quantiles } from '@podlove/state/quantiles'

export default combineReducers({
  runtime,
  theme,
  show,
  episode,
  chapters,
  timepiece,
  media,
  components,
  ghost,
  network,
  quantiles
})
