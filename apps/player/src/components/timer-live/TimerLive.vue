<template>
  <timer
    v-if="!live || ghostTime"
    role="timer"
    :color="state.color"
    :time="ghostTime ? ghostTime : time"
    :aria-label="$t(state.a11y.key, state.a11y.attr)"
    tabindex="0"
    :remaining="true"
    data-test="timer-live"
  />
  <span v-else data-test="label-live">{{ $t('LIVE') }}</span>
</template>

<script>
import Timer from '@podlove/components/timer/Timer.vue'
import { mapState } from 'redux-vuex'
import select from '../../store/selectors'

export default {
  components: { Timer },

  setup() {
    return {
      state: mapState({
        playtime: select.playtime,
        livesync: select.livesync,
        ghost: select.ghost.time,
        color: select.theme.contrast,
        a11y: select.accessibility.timerLive
      })
    }
  },

  data() {
    return {
      time: 0
    }
  },

  computed: {
    ghostTime() {
      return this.state.ghost ? this.state.livesync - this.state.ghost : null
    },
    live() {
      return this.time <= 5000
    },
    livesync() {
      return this.state.livesync
    }
  },

  watch: {
    livesync() {
      this.time = this.state.livesync - this.state.playtime
    }
  }
}
</script>
