import { createSelector } from 'reselect'
import { selectors as quantiles } from '@podlove/player-state/quantiles'

import root from './root.js'

export default createSelector(root.quantiles, quantiles.quantiles)
