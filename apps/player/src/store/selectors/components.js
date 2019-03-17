import { compose } from 'ramda'
import root from './root'
import { selectors as components } from '@podlove/player-state/components'

export default {
  playButton: compose(
    components.playButton,
    root.components
  ),
  chapterButtons: compose(
    components.chapterButtons,
    root.components
  ),
  stepperButtons: compose(
    components.stepperButtons,
    root.components
  ),
  progressBar: compose(
    components.progressBar,
    root.components
  ),
  volumeControl: compose(
    components.volumeControl,
    root.components
  ),
  rateControl: compose(
    components.rateControl,
    root.components
  ),
  poster: compose(
    components.poster,
    root.components
  ),
  onfo: compose(
    components.onfo,
    root.components
  ),
  error: compose(
    components.error,
    root.components
  ),
  infoTab: compose(
    components.infoTab,
    root.components
  ),
  chaptersTab: compose(
    components.chaptersTab,
    root.components
  ),
  transcriptTab: compose(
    components.transcriptTab,
    root.components
  ),
  shareTab: compose(
    components.shareTab,
    root.components
  ),
  filesTab: compose(
    components.filesTab,
    root.components
  ),
  audioTab: compose(
    components.audioTab,
    root.components
  )
}
