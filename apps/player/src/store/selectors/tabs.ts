import { createSelector } from 'reselect'
import { createObject } from '@podlove/utils/helper'
import { selectors as tabs } from '@podlove/player-state/tabs'

import root from './root.js'

export default createObject({
  chapters: createSelector(root.tabs, tabs.chapters),
  share: createSelector(root.tabs, tabs.share),
  files: createSelector(root.tabs, tabs.files),
  shownotes: createSelector(root.tabs, tabs.shownotes),
  transcripts: createSelector(root.tabs, tabs.transcripts),
  playlist: createSelector(root.tabs, tabs.playlist)
})
