<template lang="pug">
    progress-bar(
      @input="dispatch"
      @simulate="dispatch"
      @ghost="dispatch"
      :progressColor="color(progressColor).fade(0.7).string()"
      :thumbColor="thumbColor"
      :highlightColor="highlightColor"
      :duration="duration"
      :time="playtime"
      :ghost="ghost"
      :buffer="buffer"
      :chapters="chapters"
      :quantiles="quantiles"
      :title="$t('A11Y.PROGRESSBAR_INPUT')"
      data-test="progress-bar"
    )
</template>

<script>
import { mapState } from 'redux-vuex'
import color from 'color'
import ProgressBar from '@podlove/components/progress-bar'

import store from 'store'
import select from 'store/selectors'

export default {
  components: {
    ProgressBar
  },
  data: mapState({
    progressColor: select.theme.brandDark,
    thumbColor: select.theme.brandDark,
    highlightColor: select.theme.brandLightest,
    duration: select.duration,
    playtime: select.playtime,
    ghost: select.ghost.time,
    buffer: select.network.buffer,
    chapters: select.chapters.list,
    quantiles: select.quantiles
  }),
  methods: {
    dispatch: store.dispatch,
    color
  }
}
</script>
