<template>
  <time class="timer" :style="timerStyle" :datetime="toHumanTime(time)">{{
    `${remaining ? '-' : ''}${toHumanTime(time)}`
  }}</time>
</template>

<script>
import { toHumanTime } from '@podlove/utils/time'

export default {
  props: {
    color: {
      type: String,
      default: undefined
    },
    time: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    timerStyle() {
      if (!this.color) {
        return {}
      }

      return {
        color: this.color
      }
    }
  },
  methods: {
    toHumanTime
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'font';

// Timer
.timer {
  font-variant-numeric: tabular-nums;
}
</style>
