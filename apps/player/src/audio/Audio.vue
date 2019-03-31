<template lang="pug">
  div.audio-tab#tab-audio
    volume.seperator(v-if="volumeVisible")
    rate.seperator(v-if="rateVisible")
    brand
</template>

<script>
import { mapState } from 'redux-vuex'

import select from 'store/selectors'

import Volume from './components/volume'
import Rate from './components/rate'
import Brand from './components/brand'

export default {
  components: {
    Volume,
    Rate,
    Brand
  },
  data: mapState({
    volumeVisible: select.components.volumeControl,
    rateVisible: select.components.rateControl
  })
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.audio-tab {
  width: 100%;
  padding-top: $padding;
}
</style>
