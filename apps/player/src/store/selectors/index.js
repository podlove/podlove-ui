// Application Wide Selectors

import styles from './styles'
import runtime from './runtime'
import timepiece from './timepiece'
import header from './header'
import episode from './episode'
import chapters from './chapters'
import accessibility from './accessibility'
import show from './show'
import media from './media'

export default {
  ...runtime,
  ...timepiece,
  chapters,
  header,
  episode,
  show,
  styles,
  accessibility,
  media
}
