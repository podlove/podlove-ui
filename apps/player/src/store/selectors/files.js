import { compose } from 'ramda'
import { selectors as files } from '@podlove/player-state/files'

import root from './root'

export default {
  audio: compose(
    files.audio,
    root.files
  )
}
