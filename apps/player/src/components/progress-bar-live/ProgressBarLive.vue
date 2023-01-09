<template>
  <progress-bar
    :progress-color="progressColor"
    :thumb-color="state.thumbColor"
    :highlight-color="state.highlightColor"
    :duration="state.livesync"
    :time="state.playtime"
    :ghost="state.ghost"
    :buffer="state.livesync ? state.buffer : []"
    :title="$t(state.title.key, state.title.attr)"
    data-test="progress-bar-live"
    @time="dispatch"
    @simulate="dispatch"
    @ghost="dispatch"
  />
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import color from 'color'
import ProgressBar from '@podlove/components/progress-bar/ProgressBar.vue'

import select from '../../store/selectors'

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
        playtime: select.playtime,
        ghost: select.ghost.time,
        buffer: select.network.buffer,
        title: select.accessibility.progressBar,
        livesync: select.livesync
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    progressColor() {
      return color(this.state.progressColor).fade(0.7).string()
    }
  }
}
</script>
