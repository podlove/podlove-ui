<template lang="pug">
  transition(name="entry")
    div.progress-bar(:style="containerStyle" v-if="progressBar")
      progress-component
      timer-bar-component
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

import ProgressComponent from './components/Progress'
import TimerBarComponent from './components/TimerBar'

export default {
  components: {
    ProgressComponent,
    TimerBarComponent
  },
  data: mapState({
    containerStyle: select.styles.progress,
    progressBar: select.components.progressBar
  })
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.progress-bar {
  padding: 0 $padding;
  height: $progress-bar-height;
}
</style>
