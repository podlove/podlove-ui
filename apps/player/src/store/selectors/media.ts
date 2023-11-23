import { createSelector } from 'reselect'
import { selectors as media } from '@podlove/player-state/media'

import root from './root.js'

export default createSelector(root.media, media.media)
