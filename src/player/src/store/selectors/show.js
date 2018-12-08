import { selectors as show } from '@podlove/state/show'
import { compose } from 'ramda'

import root from './root'

export default {
  title: compose(show.title, root.show),
  subtitle: compose(show.subtitle, root.show),
  summary: compose(show.summary, root.show),
  link: compose(show.link, root.show),
  poster: compose(show.poster, root.show)
}
