<template lang="pug">
  div.header(:style="style")
    poster-component(v-if="poster")
    div.info
      show-title-component(v-if="showTitle")
      episode-title-component(v-if="episodeTitle")
      episode-description-component(v-if="subtitle")
</template>

<script>
import select from 'store/selectors'
import { mapState } from 'redux-vuex'

import PosterComponent from './components/Poster'
import ShowTitleComponent from './components/ShowTitle'
import EpisodeTitleComponent from './components/EpisodeTitle'
import EpisodeDescriptionComponent from './components/EpisodeDescription'

export default {
  components: {
    PosterComponent,
    ShowTitleComponent,
    EpisodeTitleComponent,
    EpisodeDescriptionComponent
  },

  data: mapState({
    style: select.styles.header,
    showTitle: select.components.showTitle,
    episodeTitle: select.components.episodeTitle,
    subtitle: select.components.subtitle,
    poster: select.components.poster
  }),

  computed: {
    errorWrapper() {
      return {
        background: this.errorStyle.background
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.header {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 300;
}

.info {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

@media screen and (max-width: $width-m) {
  .header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
