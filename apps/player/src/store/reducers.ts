import { combineReducers } from 'redux'

import { reducer as runtime } from '@podlove/player-state/runtime'
import { reducer as theme } from '@podlove/player-state/theme'
import { reducer as episode } from '@podlove/player-state/episode'
import { reducer as chapters } from '@podlove/player-state/chapters'
import { reducer as timepiece } from '@podlove/player-state/timepiece'
import { reducer as show } from '@podlove/player-state/show'
import { reducer as media } from '@podlove/player-state/media'
import { reducer as components } from '@podlove/player-state/components'
import { reducer as ghost } from '@podlove/player-state/ghost'
import { reducer as network } from '@podlove/player-state/network'
import { reducer as quantiles } from '@podlove/player-state/quantiles'
import { reducer as tabs } from '@podlove/player-state/tabs'
import { reducer as contributors } from '@podlove/player-state/contributors'
import { reducer as files } from '@podlove/player-state/files'
import { reducer as content } from '@podlove/player-state/content'
import { reducer as embed } from '@podlove/player-state/embed'
import { reducer as reference } from '@podlove/player-state/reference'
import { reducer as audio } from '@podlove/player-state/audio'
import { reducer as transcripts } from '@podlove/player-state/transcripts'
import { reducer as lastAction } from '@podlove/player-state/last-action'
import { reducer as error } from '@podlove/player-state/error'
import { reducer as driver } from '@podlove/player-state/driver'
import { reducer as playstate } from '@podlove/player-state/playstate'
import { reducer as playlist } from '@podlove/player-state/playlist'
import { reducer as subscribeButton } from '@podlove/player-state/subscribe-button'
import { reducer as channels } from '@podlove/player-state/channels'
import { reducer as lifecycle } from '@podlove/player-state/lifecycle'

export default combineReducers({
  lifecycle,
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
  quantiles,
  tabs,
  contributors,
  files,
  reference,
  audio,
  transcripts,
  share: combineReducers({
    content,
    embed
  }),
  lastAction,
  error,
  driver,
  playstate,
  playlist,
  subscribeButton,
  channels
})
