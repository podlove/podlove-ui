import { createSelector } from 'reselect'
import { selectors as ghost } from '@podlove/player-state/ghost'
import { currentChapterByPlaytime } from '@podlove/utils/chapters'

import root from './root.js'
import chapters from './chapters.js'
import State from '../state.js'

const time = createSelector(root.ghost, ghost.time)
const active = createSelector(root.ghost, ghost.active)

export default {
  time,
  active,
  chapter: (state: State) => currentChapterByPlaytime(chapters.list(state), time(state))
}
