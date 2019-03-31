<template lang="pug">
  div.input-element(:aria-label="$t('A11Y.VOLUME')")
    label.spaced(tabindex="0" :aria-label="$t('A11Y.VOLUME_CURRENT', { volume: toPercent(visualVolume) })")
      span.input-label {{ $t('AUDIO.VOLUME') }}
      span.input-state#tab-audio--volume--current
        input.input-value#tab-audio--volume--value(type="number" :value="toPercent(visualVolume)" @input="setVolume($event.target.value / 100)")
        span.input-suffix %

    div.volume-slider.centered
      button-component.slider-button.mute-control#tab-audio--volume--mute(@click.native="toggleMute")
        icon(:type="icon")
        span.visually-hidden {{ a11y }}
      input-slider#tab-audio--volume--input(
        :min="0"
        :max="1"
        :pins="pins"
        :value="visualVolume"
        :step="0.001"
        @input="setVolume"
        @dblclick="setVolume(1)"
        :aria-label="$t('A11Y.SET_VOLUME_IN_PERCENT')"
      )
</template>

<script>
import { compose } from 'ramda'
import { toPercent } from '@podlove/utils/math'
import { setVolume, mute, unmute } from '@podlove/player-actions/audio'
import { Icon, InputSlider, Button } from '@podlove/components'

import buttonColor from 'directives/button-color'
import inputColor from 'directives/input-color'
import select from 'store/selectors'
import store from 'store'

export default {
  components: {
    InputSlider: inputColor(InputSlider),
    ButtonComponent: buttonColor(Button),
    Icon
  },
  data() {
    return {
      ...this.mapState({
        volume: select.audio.volume,
        muted: select.audio.muted,
        icon: select.audio.icon
      }),
      pins: [
        {
          value: 0,
          label: '0%'
        },
        {
          value: 0.25,
          label: '25%'
        },
        {
          value: 0.5,
          label: '50%'
        },
        {
          value: 0.75,
          label: '75%'
        },
        {
          value: 1,
          label: '100%'
        }
      ]
    }
  },
  computed: {
    visualVolume() {
      if (this.muted) {
        return 0
      }

      return this.volume
    },

    a11y() {
      return this.muted ? this.$t('A11Y.VOLUME_UNMUTE') : this.$t('A11Y.VOLUME_MUTE')
    }
  },
  methods: {
    setVolume: compose(
      store.dispatch,
      setVolume
    ),
    mute: compose(
      store.dispatch,
      mute
    ),
    unmute: compose(
      store.dispatch,
      unmute
    ),
    toggleMute() {
      this.muted ? this.unmute() : this.mute()
    },
    toPercent
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.audio-tab {
  .input-value {
    font-size: 1.1em;
  }
  .mute-control {
    width: $mute-control-width;
  }
}
</style>
