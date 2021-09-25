<template>
  <play-button
    v-if="button.type"
    class="overflow-hidden"
    :type="button.type"
    :title="button.a11y"
    :color="background"
    :background="color"
    :size="size"
    :label="button.label"
    data-test="play-button"
    @play="dispatch"
    @pause="dispatch"
    @restart="dispatch"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  />
</template>

<script>
import { toHumanTime } from '@podlove/utils/time'
import { mapState, injectStore } from 'redux-vuex'

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
  setup() {
    return {
      state: mapState({
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
      }),
      dispatch: injectStore().dispatch
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    background() {
      return this.state.brandLightest
    },

    color() {
      return this.hover ? this.state.brandDarkest : this.state.brandDark
    },

    button() {
      switch (this.state.playButton) {
        case 'paused':
          return {
            type: 'play',
            a11y: this.$t(this.state.playA11y.key, this.state.playA11y.attr),
            width: '50px'
          }
        default:
        case 'duration':
          return {
            type: 'play',
            a11y: this.$t(this.state.durationA11y.key, this.state.durationA11y.attr),
            label:
              this.variant === 'details'
                ? this.label ||
                  toHumanTime(this.state.playtime > 0 ? this.state.playtime : this.state.duration)
                : null
          }
        case 'remaining':
          return {
            type: 'play',
            label: this.variant === 'details' ? toHumanTime(this.state.playtime) : null
          }
        case 'replay':
          return {
            type: 'restart',
            a11y: this.$t(this.state.replayA11y.key, this.state.replayA11y.attr),
            label: this.$t('PLAYER.REPLAY')
          }
        case 'loading':
          return {
            type: 'loading'
          }
        case 'playing':
          return {
            type: 'pause',
            a11y: this.$t(this.state.pauseA11y.key, this.state.pauseA11y.attr)
          }
        case 'error':
          return {
            type: 'restart',
            a11y: this.$t(this.state.errorA11y.key, this.state.errorA11y.attr)
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
    mouseOver() {
      this.hover = true
    },
    mouseLeave() {
      this.hover = false
    }
  }
}
</script>
