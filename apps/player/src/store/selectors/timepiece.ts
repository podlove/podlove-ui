import { createSelector } from 'reselect'
import { selectors as timepiece } from '@podlove/player-state/timepiece'

import root from './root.js'
import State from '../state.js'

export default {
  playtime: createSelector(root.timepiece, timepiece.playtime) as (input: State) => number,
  duration: createSelector(root.timepiece, timepiece.duration) as (input: State) => number,
  livesync: createSelector(root.timepiece, timepiece.livesync)  as (input: State) => number
}
