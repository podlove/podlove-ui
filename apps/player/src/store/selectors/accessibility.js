import episode from './episode'
import show from './show'

export default {
  poster: state => {
    if (episode.poster(state)) {
      return 'A11Y.ALT_EPISODE_COVER'
    }

    if (show.poster(state)) {
      return 'A11Y.ALT_SHOW_COVER'
    }
  }
}
