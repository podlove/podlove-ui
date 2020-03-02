import { mapState } from 'redux-vuex'
import selectors from '../store/selectors'

export default Vue =>
  Vue.mixin({
    data: mapState({
      state: state => ({
        title: selectors.episode.title(state),
        subtitle: selectors.episode.subtitle(state),
        summary: selectors.episode.summary(state),
        publicationDate: selectors.episode.publicationDate(state),
        poster: selectors.episode.poster(state),
        link: selectors.episode.link(state),
        duration: selectors.duration(state),
        playtime: selectors.playtime(state),
        show: {
          title: selectors.show.title(state),
          subtitle: selectors.show.subtitle(state),
          summary: selectors.show.summary(state),
          poster: selectors.show.poster(state),
          link: selectors.show.link(state)
        },
        playstate: selectors.playstate(state)
      })
    })
  })
