import { compose, propOr, equals, lt, length } from 'ramda'
import root from './root'
import { selectors as components } from '@podlove/player-state/components'
import chapters from './chapters'

export default {
  playButton: compose(components.playButton, root.components),
  chapterButtons: compose(components.chapterButtons, root.components),
  stepperButtons: compose(components.stepperButtons, root.components),
  progressBar: compose(components.progressBar, root.components),
  volumeControl: compose(components.volumeControl, root.components),
  rateControl: compose(components.rateControl, root.components),
  poster: compose(components.poster, root.components),
  error: compose(components.error, root.components),
  shownotesTab: compose(components.shownotesTab, root.components),
  chaptersTab: compose(components.chaptersTab, root.components),
  transcriptTab: compose(components.transcriptTab, root.components),
  shareTab: compose(components.shareTab, root.components),
  filesTab: compose(components.filesTab, root.components),
  playlistTab: compose(components.playlistTab, root.components),
  nextChapterDisabled: compose(equals(-1), propOr(-1, 'index'), chapters.next),
  previousChapterDisabled: compose(equals(-1), propOr(-1, 'index'), chapters.previous),
  chaptersChannel: compose(lt(0), length, chapters.list),
  sharePlaytime: compose(components.sharePlaytime, root.components)
}
