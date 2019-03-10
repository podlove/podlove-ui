import { compose } from 'ramda'
import { selectors as network } from '@podlove/player-state/network'

import root from './root'

const buffer = compose(network.buffer, root.network)

export default {
  buffer
}
