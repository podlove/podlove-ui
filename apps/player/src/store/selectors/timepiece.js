import { selectors as timepiece } from '@podlove/player-state/timepiece'
import { compose } from 'lodash/fp'

import root from './root'

export default {
  playtime: compose(timepiece.playtime, root.timepiece),
  duration: compose(timepiece.duration, root.timepiece)
}
