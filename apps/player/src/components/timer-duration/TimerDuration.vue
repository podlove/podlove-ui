<template lang="pug">
  timer(:color="color" :time="duration - (ghost ? ghost : playtime)" :aria-label="a11y.current" tabindex="0" :remaining="true" data-test="timer-duration")
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
    color: select.theme.contrast
  }),

  computed: {
    a11y() {
      return this.$t('A11Y.TIMER_LEFT', {
        hours: calcHours(this.duration - this.playtime),
        minutes: calcMinutes(this.duration - this.playtime),
        seconds: calcSeconds(this.duration - this.playtime)
      })
    }
  }
}
</script>
