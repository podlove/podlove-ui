import { createSelector } from 'reselect'
import { selectors as show } from '@podlove/player-state/show'

import root from './root.js'

export default {
  title: createSelector(root.show, show.title),
  subtitle: createSelector(root.show, show.subtitle),
  summary: createSelector(root.show, show.summary),
  link: createSelector(root.show, show.link),
  poster: createSelector(root.show, show.poster)
}
