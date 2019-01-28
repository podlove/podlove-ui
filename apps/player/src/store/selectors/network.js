import { compose } from 'ramda'
import { selectors as network } from '@podlove/state/network'

import root from './root'

const buffer = compose(network.buffer, root.network)

export default {
  buffer
}
