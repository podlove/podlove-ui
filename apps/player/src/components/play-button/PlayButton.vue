<template lang="pug">
play-button.overflow-hidden(
  v-if='button.type',
  :type='button.type',
  :title='button.a11y',
  :color='background',
  :background='color',
  :size='size',
  @click='dispatch',
  :label='button.label',
  @mouseover.native='mouseOver',
  @mouseleave.native='mouseLeave',
  data-test='play-button'
)
</template>

<script>
import { calcHours, calcMinutes, calcSeconds, toHumanTime } from '@podlove/utils/time'
import store from 'store'

import select from 'store/selectors'
import PlayButton from '@podlove/components/play-button'

export default {
  components: {
    PlayButton
  },
  props: {
    label: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: 50
    },
    variant: {
      type: String,
      validate: (val) => ['details', 'simple'].includes(val),
      default: 'details'
    }
  },
  data() {
    return {
      hover: false,
      ...this.mapState({
        brandDark: select.theme.brandDark,
        brandDarkest: select.theme.brandDarkest,
        brandLightest: select.theme.brandLightest,
        playButton: select.components.playButton,
        duration: select.duration,
        playtime: select.playtime,
        pauseA11y: select.accessibility.playButtonPause,
        durationA11y: select.accessibility.playButtonDuration,
        replayA11y: select.accessibility.playButtonReplay,
        playA11y: select.accessibility.playButtonPlay,
        errorA11y: select.accessibility.playButtonError
      })
    }
  },
  computed: {
    background() {
      return this.brandLightest
    },

    color() {
      return this.hover ? this.brandDarkest : this.brandDark
    },

    button() {
      switch (this.playButton) {
        case 'paused':
          return {
            type: 'play',
            a11y: this.$t(this.playA11y.key, this.playA11y.attr),
            width: '50px'
          }
        default:
        case 'duration':
          return {
            type: 'play',
            a11y: this.$t(this.durationA11y.key, this.durationA11y.attr),
            label:
              this.variant === 'details'
                ? this.label || toHumanTime(this.playtime > 0 ? this.playtime : this.duration)
                : null
          }
        case 'remaining':
          return {
            type: 'play',
            label: this.variant === 'details' ? toHumanTime(this.playtime) : null
          }
        case 'replay':
          return {
            type: 'restart',
            a11y: this.$t(this.replayA11y.key, this.replayA11y.attr),
            label: this.$t('PLAYER.REPLAY')
          }
        case 'loading':
          return {
            type: 'loading'
          }
        case 'playing':
          return {
            type: 'pause',
            a11y: this.$t(this.pauseA11y.key, this.pauseA11y.attr)
          }
        case 'error':
          return {
            type: 'restart',
            a11y: this.$t(this.errorA11y.key, this.errorA11y.attr)
          }
        case 'retry':
          return {
            type: 'restart',
            label: this.$t('PLAYER.RETRY')
          }
        case 'end':
          return {
            type: 'restart'
          }
      }
    }
  },
  methods: {
    dispatch: store.dispatch,
    mouseOver() {
      this.hover = true
    },
    mouseLeave() {
      this.hover = false
    }
  }
}
</script>
