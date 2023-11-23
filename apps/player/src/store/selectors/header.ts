import timepiece from './timepiece.js'
import show from './show.js'
import episode from './episode.js'
import chapters from './chapters.js'

const posterSrc = (state) => {
  const playtime = timepiece.playtime(state)

  if (playtime === 0) {
    return episode.poster(state) || show.poster(state)
  }

  return chapters.image(state) || episode.poster(state) || show.poster(state)
}

export default {
  posterSrc
}
