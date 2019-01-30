import { compose } from 'ramda'
import root from './root'
import { selectors as ghost } from '@podlove/state/ghost'
import { currentChapterByPlaytime } from '@podlove/utils/chapters'

import chapters from './chapters'

const time = compose(ghost.time, root.ghost)

export default {
  time,
  chapter: state => currentChapterByPlaytime(chapters.list(state), time(state))
}
