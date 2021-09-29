import timepiece from './timepiece'
import show from './show'
import episode from './episode'
import chapters from './chapters'

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
