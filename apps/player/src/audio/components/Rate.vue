<template lang="pug">
  div.input-element(:aria-label="$t('A11Y.RATE')")
    label.spaced(tabindex="0" :aria-label="$t('A11Y.RATE_CURRENT', { rate: toDecimal(rate) })")
      span.input-label {{ $t('AUDIO.SPEED') }}
      span.input-state#tab-audio--rate--current
        input.input-value#tab-audio--rate--value(type="number" :value="toDecimal(rate)" step="0.01" @input="setStateRate($event.target.value)")
        span.input-suffix x
    div.rate-slider.centered
      input-slider#tab-audio--rate--input(
        :aria-label="$t('A11Y.SET_RATE_IN_PERCENT')"
        @dblclick="setRate(1)"
        :min="0" :max="1" :step="0.001"
        :pins="pins"
        :value="sliderRate"
        @input="toStateRate"
      )
</template>

<script>
  import { compose } from 'ramda'
  import { toDecimal, roundUp, round } from '@podlove/utils/math'
  import { setRate } from '@podlove/player-actions/audio'
  import { InputSlider } from '@podlove/components'

  import inputColor from 'directives/input-color'

  import select from 'store/selectors'
  import store from 'store'

  // Speed Modifiers
  const normalizeSliderValue = (value = 0) => {
    if (value < 0) {
      return 0
    }

    if (value > 1) {
      return 1
    }

    return value
  }

  const normalizeRateValue = (value = 0) => {
    if (value < 0.5) {
      return 0.5
    }

    if (value > 4) {
      return 4
    }

    return value
  }

  const speedSliderToState = (value = 0) => {
    value = parseFloat(value)

    if (value <= 0.5) {
      return value + 0.5
    }

    return 2 * value + (value - 0.5) * 4
  }

  const stateToSpeedSlider = (value = 0) => {
    value = parseFloat(value)

    if (value <= 1) {
      return value - 0.5
    }

    return (value + 2) / 6
  }

  export default {
    data () {
      return {
        ...this.mapState({
          rate: select.audio.rate
        }),
        pins: [{
          value: 0,
          label: '0.5x'
        }, {
          value: 0.245,
          label: '0.75x'
        }, {
          value: 0.5,
          label: '1x'
        }, {
          value: 0.665,
          label: '2x'
        }, {
          value: 0.84,
          label: '3x'
        }, {
          value: 1,
          label: '4x'
        }]
      }
    },
    computed: {
      sliderRate () {
        return this.toSliderRate(this.rate)
      }
    },
    methods: {
      setRate: compose(store.dispatch, setRate),
      toStateRate (value) {
        compose(
          this.setRate.bind(this),
          round,
          speedSliderToState,
          normalizeSliderValue
        )(value)
      },
      setStateRate (value) {
        compose(
          this.setRate.bind(this),
          round
        )(value)
      },
      changeRate (offset, rate) {
        return compose(this.setRate.bind(this), roundUp(offset))(rate)
      },
      toSliderRate: compose(round, stateToSpeedSlider, normalizeRateValue),
      toDecimal
    },
    components: {
      InputSlider: inputColor(InputSlider)
    }
  }
</script>
