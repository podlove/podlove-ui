<template lang="pug">
  timer(role="timer" :color="color" :time="duration - (ghost ? ghost : playtime)" :aria-label="$t(a11y.key, a11y.attr)" tabindex="0" :remaining="true" data-test="timer-duration")
</template>

<script>
import { mapState } from 'redux-vuex'
import Timer from '@podlove/components/timer'

import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'
import select from 'store/selectors'

export default {
  components: { Timer },

  data: mapState({
    playtime: select.playtime,
    duration: select.duration,
    ghost: select.ghost.time,
    color: select.theme.contrast,
    a11y: select.accessibility.timerDuration
  })
}
</script>
