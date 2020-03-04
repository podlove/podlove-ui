import { compose } from 'ramda'
import { selectors as playlist } from '@podlove/player-state/playlist'

import root from './root'

export default {
  list: compose(playlist.list, root.playlist),
  config: compose(playlist.config, root.playlist)
}
