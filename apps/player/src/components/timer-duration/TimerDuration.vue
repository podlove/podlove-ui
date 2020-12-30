<template>
  <timer
    role="timer"
    :color="state.color"
    :time="state.duration - (state.ghost ? state.ghost : state.playtime)"
    :aria-label="$t(state.a11y.key, state.a11y.attr)"
    tabindex="0"
    :remaining="true"
    data-test="timer-duration"
  />
</template>

<script>
import { mapState } from 'redux-vuex'
import Timer from '@podlove/components/timer'

import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'
import select from 'store/selectors'

export default {
  components: { Timer },

  setup() {
    return {
      state: mapState({
        playtime: select.playtime,
        duration: select.duration,
        ghost: select.ghost.time,
        color: select.theme.contrast,
        a11y: select.accessibility.timerDuration
      })
    }
  }
}
</script>
