import { compose } from 'ramda'
import { selectors as files } from '@podlove/player-state/files'

import root from './root'

export default {
  files: compose(files.files, root.files)
}
