<template lang="pug">
  div(data-test="poster")
    lazy-image(:url="posterSrc" :alt="$t(altText)" @error="errorPosterLoad" :color="coverColor")
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import Image from '@podlove/components/image'

import select from 'store/selectors'

export default {
  components: { LazyImage: Image },
  data: mapState({
    posterSrc: select.header.posterSrc,
    altText: select.accessibility.poster,
    coverColor: select.theme.brandLightest
  }),
  methods: mapActions('errorPosterLoad')
}
</script>
