<template>
  <div data-test="poster">
    <lazy-image :url="state.posterSrc" :color="state.coverColor" alt="" @error="errorPosterLoad" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import Image from '@podlove/components/image'

import select from 'store/selectors'

export default {
  components: { LazyImage: Image },
  setup() {
    return {
      state: mapState({
        posterSrc: select.header.posterSrc,
        coverColor: select.theme.brandLightest
      }),
      ...mapActions('errorPosterLoad')
    }
  }
}
</script>
