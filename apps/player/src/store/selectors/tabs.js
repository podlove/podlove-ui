import { compose } from 'ramda'

import root from './root'
import { createObject } from '@podlove/utils/helper'
import { selectors as tabs } from '@podlove/player-state/tabs'

export default createObject({
  chapters: compose(tabs.chapters, root.tabs),
  audio: compose(tabs.audio, root.tabs),
  share: compose(tabs.share, root.tabs),
  files: compose(tabs.files, root.tabs),
  shownotes: compose(tabs.shownotes, root.tabs),
  transcripts: compose(tabs.transcripts, root.tabs),
  playlist: compose(tabs.playlist, root.tabs)
})
