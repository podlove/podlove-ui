<template lang="pug">
  div(data-test="poster")
    lazy-image(:url="posterSrc" alt="" @error="errorPosterLoad" :color="coverColor")
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import Image from '@podlove/components/image'

import select from 'store/selectors'

export default {
  components: { LazyImage: Image },
  data: mapState({
    posterSrc: select.header.posterSrc,
    coverColor: select.theme.brandLightest
  }),
  methods: mapActions('errorPosterLoad')
}
</script>
