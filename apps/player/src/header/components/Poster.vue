<template lang="pug">
  div.poster#header-poster
    lazy-image.poster-image(:style="style" :url="posterSrc" :alt="$t(altText)" @error="errorPosterLoad" :color="coverColor")
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import { Image } from '@podlove/components'

import select from 'store/selectors'

export default {
  data: mapState({
    style: select.styles.poster,
    posterSrc: select.header.posterSrc,
    altText: select.accessibility.poster,
    coverColor: select.styles.imageCover
  }),
  components: { LazyImage: Image },
  methods: mapActions('errorPosterLoad')
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.poster {
  margin: 0 $margin 0 0;
}

.poster-image {
  height: $poster-size;
  width: $poster-size;
  line-height: 0;
  border-width: 2px;
  border-style: solid;
}

@media screen and (max-width: $width-m) {
  .poster {
    width: 100%;
    display: flex;
    margin: 0 0 $margin 0;
    justify-content: center;
  }

  .poster-image {
    height: calc(#{$poster-size} + 3em); // Height of description
    width: calc(#{$poster-size} + 3em); // Height of description
  }
}
</style>
