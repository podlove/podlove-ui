<template>
  <div class="input-slider w-full relative">
    <input
      type="range"
      :min="min"
      :max="max"
      :value="value"
      :step="step"
      @input="handleInput"
      @change="handleChange"
      @dblclick="handleDblclick"
    />
    <span class="track block w-full absolute left-0 pointer-events-none" :style="trackStyle" />
    <span
      v-for="(pin, index) in pins"
      :key="index"
      class="pin block absolute font-medium text-xs text-center"
      :style="{ left: `${round(pin.value * 100)}%` }"
    >
      {{ pin.label }}
    </span>
    <span
      class="thumb absolute border border-solid pointer-events-none rounded-lg"
      :style="thumbStyle"
    />
    <slot />
  </div>
</template>

<script>
import color from 'color'
import { pluck } from 'ramda'
import { round } from '@podlove/utils/math'

import * as defaultColors from 'defaults'

const pinRange = 0.01

const relativePosition = (current = 0, minimum = 0, maximum = 0) =>
  ((parseFloat(current, 1000) - parseFloat(minimum, 1000)) * 100) /
  (parseFloat(maximum, 1000) - parseFloat(minimum, 1000))

export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 0.1
    },
    value: {
      type: Number,
      default: 0
    },
    pins: {
      type: Array,
      default: () => []
    },
    background: {
      type: String,
      default: defaultColors.background
    },
    borderColor: {
      type: String,
      default: defaultColors.color
    },
    progressColor: {
      type: String,
      default: defaultColors.color
    }
  },
  emits: {
    sliderInput: null,
    sliderChange: null,
    sliderDblclick: null
  },
  computed: {
    trackStyle() {
      return {
        'background-color': color(this.progressColor).fade(0.7)
      }
    },

    thumbStyle() {
      const left = relativePosition(this.value, this.min, this.max)
      return {
        left: `${left}%`,
        'background-color': this.background,
        'border-color': this.borderColor
      }
    }
  },
  methods: {
    calcValue(event) {
      const value = event.target.value

      return (
        this.pins
          .map(pluck('value'))
          .find((pin) => pin + pinRange >= value && pin - pinRange <= value) || value
      )
    },

    round,

    // Events Handlers
    handleInput(event) {
      this.$emit('sliderInput', this.calcValue(event))
    },
    handleChange(event) {
      this.$emit('sliderChange', this.calcValue(event))
    },
    handleDblclick(event) {
      this.$emit('sliderDblclick', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$subtile-color: rgba(0, 0, 0, 0.2);

@import '../../theme/tokens/progress';
@import '../../theme/tokens/input';
@import '../../theme/resets';

.input-slider {
  @include range($progress-height, $thumb-width-desktop, $thumb-width-desktop-hover);

  height: $slider-height;

  .track {
    top: 50%;
    height: 2px;
    background-color: $subtile-color;
    border-radius: 2px;
  }

  .pin {
    top: -10px;
    color: $subtile-color;
    width: 30px;
    margin-left: $thumb-width-desktop / 2 * -1;
  }

  .thumb {
    top: calc(50% - 4px);
    height: 10px;
    width: 10px;
    border-color: $subtile-color;
    margin-left: $thumb-width-desktop / 4 * -1;
  }
}
</style>
