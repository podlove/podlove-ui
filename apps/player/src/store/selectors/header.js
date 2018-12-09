import { ifElse, equals, compose, defaultTo } from 'ramda'

import timepiece from './timepiece'
import show from './show'
import episode from './episode'
import chapters from './chapters'

const posterSrc = ifElse(
  compose(equals(0), timepiece.playtime),
  defaultTo(show.poster, episode.poster),
  defaultTo(show.poster, defaultTo(episode.poster, chapters.image))
)

export default {
  posterSrc
}
