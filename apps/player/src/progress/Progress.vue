<template lang="pug">
  div.progress-bar(:style="containerStyle")
    progress-bar(
      v-if="progressComponent"
      @input="dispatch"
      @simulate="dispatch"
      :progressColor="progressStyle.range"
      :thumbColor="progressStyle.thumb"
      :highlightColor="progressStyle.highlight"
      :duration="duration"
      :time="playtime"
      :ghost="ghost"
      :buffer="buffer"
      :chapters="chapters"
      :quantiles="quantiles"
      :title="$t('A11Y.PROGRESSBAR_INPUT')"
    )
</template>

<script>
import { mapState } from 'redux-vuex'
import { ProgressBar } from '@podlove/components'

import store from 'store'
import select from 'store/selectors'

export default {
  data: mapState({
    containerStyle: select.styles.progress,
    progressStyle: select.styles.progressBar,
    duration: select.duration,
    playtime: select.playtime,
    ghost: select.progress.ghost,
    buffer: select.network.buffer,
    chapters: select.chapters.list,
    quantiles: select.quantiles,
    progressComponent: select.components.progress
  }),
  methods: {
    dispatch: store.dispatch
  },
  components: {
    ProgressBar
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .progress-bar {
    padding: 0 $padding;
  }
</style>
