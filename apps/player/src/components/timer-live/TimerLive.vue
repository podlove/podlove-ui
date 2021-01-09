<template lang="pug">
timer(
  v-if='!live || ghostTime',
  role='timer',
  :color='color',
  :time='ghostTime ? ghostTime : time',
  :aria-label='$t(a11y.key, a11y.attr)',
  tabindex='0',
  :remaining='true',
  data-test='timer-live'
)
span(v-else, data-test='label-live') {{ $t('LIVE') }}
</template>

<script>
import Timer from '@podlove/components/timer'

import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'
import select from 'store/selectors'

export default {
  components: { Timer },

  data() {
    return {
      ...this.mapState({
        playtime: select.playtime,
        livesync: select.livesync,
        ghost: select.ghost.time,
        color: select.theme.contrast,
        a11y: select.accessibility.timerLive
      }),
      time: 0
    }
  },

  computed: {
    ghostTime() {
      return this.ghost ? this.livesync - this.ghost : null
    },
    live() {
      return this.time <= 5000
    }
  },

  watch: {
    livesync() {
      this.time = this.livesync - this.playtime
    }
  }
}
</script>
