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
import ghost from './ghost'
import network from './network'
import quantiles from './quantiles'
import tabs from './tabs'
import contributors from './contributors'

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
  ghost,
  network,
  quantiles,
  tabs,
  contributors
}
