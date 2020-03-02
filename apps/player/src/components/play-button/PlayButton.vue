<template lang="pug">
  play-button.overflow-hidden(v-if="button.type" :type="button.type" :color="background" :background="color" :size="size" @click="dispatch" :label="button.label" @mouseover.native="mouseOver" @mouseleave.native="mouseLeave" data-test="play-button")
    span.invisible {{ button.a11y }}
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
      validate: val => ['details', 'simple'].includes(val),
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
        playtime: select.playtime
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
            a11y: this.$t('A11Y.PLAYER_PAUSE'),
            width: '50px'
          }
        default:
        case 'duration':
          return {
            type: 'play',
            a11y: this.$t('A11Y.PLAYER_START', {
              hours: calcHours(this.playtime > 0 ? this.playtime : this.duration),
              minutes: calcMinutes(this.playtime > 0 ? this.playtime : this.duration),
              seconds: calcSeconds(this.playtime > 0 ? this.playtime : this.duration)
            }),
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
            a11y: this.$t('A11Y.PLAYER_LOADING'),
            label: this.$t('PLAYER.REPLAY')
          }
        case 'loading':
          return {
            type: 'loading'
          }
        case 'playing':
          return {
            type: 'pause',
            a11y: this.$t('A11Y.PLAYER_PLAY')
          }
        case 'error':
          return {
            type: 'restart',
            a11y: this.$t('A11Y.PLAYER_ERROR')
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
