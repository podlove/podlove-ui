<template lang="pug">
  timer#timer-current(:color="color" :time="ghost ? ghost: playtime" :aria-label="a11y.current" tabindex="0")
</template>

<script>
import { mapState } from 'redux-vuex'
import { Timer } from '@podlove/components'

import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'
import select from 'store/selectors'

export default {
  components: { Timer },

  data: mapState({
    playtime: select.playtime,
    ghost: select.ghost.time,
    color: select.theme.contrast
  }),

  computed: {
    a11y() {
      return this.$t('A11Y.TIMER_CURRENT', {
        hours: calcHours(this.playtime),
        minutes: calcMinutes(this.playtime),
        seconds: calcSeconds(this.playtime)
      })
    }
  }
}
</script>
