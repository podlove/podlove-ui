import { compose } from 'ramda'
import root from './root'
import { selectors } from '@podlove/player-state/channels'

export default compose(selectors.channels, root.channels)
