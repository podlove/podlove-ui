<template>
  <progress-bar
    :progress-color="progressColor"
    :thumb-color="state.thumbColor"
    :highlight-color="state.highlightColor"
    :duration="state.duration"
    :time="state.playtime"
    :ghost="state.ghost"
    :buffer="state.buffer"
    :chapters="state.chapters"
    :quantiles="state.quantiles"
    :title="$t(state.title.key, state.title.attr)"
    data-test="progress-bar"
    @input="dispatch"
    @simulate="dispatch"
    @ghost="dispatch"
  />
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import color from 'color'
import ProgressBar from '@podlove/components/progress-bar'

import select from 'store/selectors'

export default {
  components: {
    ProgressBar
  },
  setup() {
    return {
      state: mapState({
        progressColor: select.theme.brandDark,
        thumbColor: select.theme.brandDark,
        highlightColor: select.theme.brandLightest,
        duration: select.duration,
        playtime: select.playtime,
        ghost: select.ghost.time,
        buffer: select.network.buffer,
        chapters: select.chapters.list,
        quantiles: select.quantiles,
        title: select.accessibility.progressBar
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    progressColor() {
      return color(this.state.progressColor)
        .fade(0.7)
        .string()
    }
  }
}
</script>
