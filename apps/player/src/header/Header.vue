<template lang="pug">
  div.header(:style="style")
    poster-component
    div.info
      show-title-component
      episode-title-component
      episode-description-component
</template>

<script>
import select from 'store/selectors'
import { mapState } from 'redux-vuex'

import PosterComponent from './components/Poster'
import ShowTitleComponent from './components/ShowTitle'
import EpisodeTitleComponent from './components/EpisodeTitle'
import EpisodeDescriptionComponent from './components/EpisodeDescription'

export default {
  data: mapState({
    style: select.styles.header
  }),

  components: {
    PosterComponent,
    ShowTitleComponent,
    EpisodeTitleComponent,
    EpisodeDescriptionComponent
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
