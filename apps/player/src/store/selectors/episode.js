import { compose } from 'ramda'
import root from './root'
import { selectors as episode } from '@podlove/player-state/episode'

export default {
  title: compose(episode.title, root.episode),
  subtitle: compose(episode.subtitle, root.episode),
  summary: compose(episode.summary, root.episode),
  link: compose(episode.link, root.episode),
  poster: compose(episode.poster, root.episode),
  publicationDate: compose(episode.publicationDate, root.episode)
}
