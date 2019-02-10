<template lang="pug">
  div.timer-bar
    timer.current#progress-bar--timer-curren(:color="timerColor" :time="ghost ? ghost: playtime" :aria-label="a11y.current" tabindex="0")
    chapter-title.chapter
    timer.left#progress-bar--timer-left(:color="timerColor" :time="duration - (ghost ? ghost : playtime)" :aria-label="a11y.current" tabindex="0" :remaining="true")
</template>

<script>
import { mapState } from 'redux-vuex'
import { Timer } from '@podlove/components'

import { calcHours, calcMinutes, calcSeconds } from '@podlove/utils/time'

import select from 'store/selectors'

import ChapterTitle from './ChapterTitle'

export default {
  data: mapState({
    playtime: select.playtime,
    duration: select.duration,
    ghost: select.ghost.time,
    timerColor: select.styles.timer
  }),

  computed: {
    a11y () {
      return {
        current: this.$t('A11Y.TIMER_CURRENT', { hours: calcHours(this.playtime), minutes: calcMinutes(this.playtime), seconds: calcSeconds(this.playtime) }),
        left: this.$t('A11Y.TIMER_LEFT', { hours: calcHours(this.duration - this.playtime), minutes: calcMinutes(this.duration - this.playtime), seconds: calcSeconds(this.duration - this.playtime) })
      }
    }
  },

  components: { Timer, ChapterTitle }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';
  @import '~styles/font';

 .timer-bar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    transition: height $animation-duration;
    margin-top: -1em;
    height: $timer-height;

    .current {
      width: $timer-width;
      text-align: left;
      margin-left: -2px;
    }

    .chapter {
      text-align: center;
      width: calc(100% - #{$timer-width * 2});
      margin: 0 $margin / 2;
    }

    .left {
      width: $timer-width;
      text-align: right;
      margin-right: -2px;
    }
  }
</style>
