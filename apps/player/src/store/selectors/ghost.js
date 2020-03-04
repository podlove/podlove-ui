import { compose } from 'ramda'
import root from './root'
import { selectors as ghost } from '@podlove/player-state/ghost'
import { currentChapterByPlaytime } from '@podlove/utils/chapters'

import chapters from './chapters'

const time = compose(ghost.time, root.ghost)
const active = compose(ghost.active, root.ghost)

export default {
  time,
  active,
  chapter: state => currentChapterByPlaytime(chapters.list(state), time(state))
}
