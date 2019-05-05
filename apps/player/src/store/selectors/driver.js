import { compose } from 'ramda'
import { selectors as driver } from '@podlove/player-state/driver'

import root from './root'

export default {
  playing: compose(
    driver.playing,
    root.driver
  )
}
