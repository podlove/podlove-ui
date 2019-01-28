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
import components from './components'
import progress from './progress'
import network from './network'
import quantiles from './quantiles'

export default {
  ...runtime,
  ...timepiece,
  chapters,
  header,
  episode,
  show,
  styles,
  accessibility,
  media,
  components,
  progress,
  network,
  quantiles
}
