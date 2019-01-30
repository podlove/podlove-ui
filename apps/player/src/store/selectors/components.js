import { compose } from 'ramda'
import root from './root'
import { selectors as components } from '@podlove/state/components'

export default {
  playButton: compose(components.playButton, root.components),
  chapterButtons: compose(components.chapterButtons, root.components),
  stepperButtons: compose(components.stepperButtons, root.components),
  progressBar: compose(components.progressBar, root.components)
}
