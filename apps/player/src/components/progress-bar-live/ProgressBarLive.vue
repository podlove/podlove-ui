<template lang="pug">
progress-bar(
  @input='dispatch',
  @simulate='dispatch',
  @ghost='dispatch',
  :progressColor='color(progressColor).fade(0.7).string()',
  :thumbColor='thumbColor',
  :highlightColor='highlightColor',
  :duration='livesync',
  :time='playtime',
  :ghost='ghost',
  :buffer='livesync ? buffer : []',
  :title='$t(title.key, title.attr)',
  data-test='progress-bar-live'
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
    playtime: select.playtime,
    ghost: select.ghost.time,
    buffer: select.network.buffer,
    title: select.accessibility.progressBar,
    livesync: select.livesync
  }),
  methods: {
    dispatch: store.dispatch,
    color
  }
}
</script>
