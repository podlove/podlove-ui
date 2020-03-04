import { compose, either } from 'ramda'
import { selectors as driver } from '@podlove/player-state/driver'

import root from './root'
import show from './show'
import episode from './episode'
import chapters from './chapters'

export default {
  playing: compose(driver.playing, root.driver),
  title: either(episode.title, show.title),
  image: either(chapters.image, episode.poster, show.poster)
}
