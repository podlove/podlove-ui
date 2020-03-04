import { compose } from 'ramda'
import { selectors as quantiles } from '@podlove/player-state/quantiles'

import root from './root'

export default compose(quantiles.quantiles, root.quantiles)
