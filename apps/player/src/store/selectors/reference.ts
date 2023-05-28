import { createSelector } from 'reselect'
import { selectors as reference } from '@podlove/player-state/reference'

import root from './root.js'

export default {
  share: createSelector(root.reference, reference.share),
  config: createSelector(root.reference, reference.config),
  episode: createSelector(root.reference, reference.episode),
  origin: createSelector(root.reference, reference.origin)
}
