import { compose } from 'ramda'
import root from './root'
import { selectors as chapters } from '@podlove/player-state/chapters'

export default {
  list: compose(chapters.list, root.chapters),
  next: compose(chapters.next, root.chapters),
  previous: compose(chapters.previous, root.chapters),
  current: compose(chapters.current, root.chapters),
  title: compose(chapters.title, root.chapters),
  image: compose(chapters.image, root.chapters)
}
