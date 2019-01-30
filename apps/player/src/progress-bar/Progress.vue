<template lang="pug">
    progress-bar(
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
    progressStyle: select.styles.progressBar,
    duration: select.duration,
    playtime: select.playtime,
    ghost: select.ghost.time,
    buffer: select.network.buffer,
    chapters: select.chapters.list,
    quantiles: select.quantiles,
  }),
  methods: {
    dispatch: store.dispatch
  },
  components: {
    ProgressBar
  }
}
</script>
