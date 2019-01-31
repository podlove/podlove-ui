<template>
  <span class="timer" :style="timerStyle">{{ `${remaining ? '-' : ''}${toHumanTime(time)}` }}</span>
</template>

<script>
import { color } from 'defaults'
import { toHumanTime } from '@podlove/utils/time'


export default {
  props: {
    color: {
      type: String,
      default: color
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
    timerStyle () {
      return {
        color: this.color
      }
    },
  },
  methods: {
    toHumanTime
  }
}
</script>

<style lang="scss" scoped>
  @import 'font';

  // Timer
  .timer {
    display: block;
    font-variant-numeric: tabular-nums;
    @extend %font;
  }
</style>
