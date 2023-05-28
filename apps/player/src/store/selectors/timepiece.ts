import { createSelector } from 'reselect'
import { selectors as timepiece } from '@podlove/player-state/timepiece'

import root from './root.js'

export default {
  playtime: createSelector(root.timepiece, timepiece.playtime),
  duration: createSelector(root.timepiece, timepiece.duration),
  livesync: createSelector(root.timepiece, timepiece.livesync)
}
