<template lang="pug">
  timer(role="timer" :color="color" :time="ghost ? ghost: playtime" :aria-label="$t(a11y.key, a11y.attr)" tabindex="0" data-test="timer-current")
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
    ghost: select.ghost.time,
    color: select.theme.contrast,
    a11y: select.accessibility.timerRemaining
  })
}
</script>
