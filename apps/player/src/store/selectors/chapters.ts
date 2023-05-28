import { createSelector } from 'reselect'
import { selectors as chapters } from '@podlove/player-state/chapters'
import root from './root.js'

export default {
  list: createSelector(root.chapters, chapters.list),
  next: createSelector(root.chapters, chapters.next),
  previous: createSelector(root.chapters, chapters.previous),
  current: createSelector(root.chapters, chapters.current),
  title: createSelector(root.chapters, chapters.title),
  image: createSelector(root.chapters, chapters.image)
}
