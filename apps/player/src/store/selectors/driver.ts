import { selectors as driver } from '@podlove/player-state/driver'
import { createSelector } from 'reselect'

import root from './root.js'
import show from './show.js'
import episode from './episode.js'
import chapters from './chapters.js'

export default {
  playing: createSelector(root.driver, driver.playing),
  title: state => episode.title(state) || show.title(state),
  image: state => chapters.image(state) || episode.poster(state) || show.poster(state)
}
