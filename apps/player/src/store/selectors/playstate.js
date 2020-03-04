import { compose } from 'ramda'
import { selectors as playstate } from '@podlove/player-state/playstate'

import root from './root'

export default compose(playstate.playstate, root.playstate)
