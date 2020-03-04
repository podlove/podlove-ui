import { compose } from 'ramda'
import { selectors as reference } from '@podlove/player-state/reference'

import root from './root'

export default {
  share: compose(reference.share, root.reference),
  config: compose(reference.config, root.reference),
  episode: compose(reference.episode, root.reference),
  origin: compose(reference.origin, root.reference)
}
