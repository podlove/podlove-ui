import { either } from 'ramda'
import { selectors as driver } from '@podlove/player-state/driver'
import { createSelector } from 'reselect'

import root from './root.js'
import show from './show.js'
import episode from './episode.js'
import chapters from './chapters.js'

export default {
  playing: createSelector(root.driver, driver.playing),
  title: either(episode.title, show.title),
  image: either(chapters.image, episode.poster, show.poster)
}
