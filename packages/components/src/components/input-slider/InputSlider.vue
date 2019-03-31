<template>
  <div class="input-slider">
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
    <span class="track" />
    <span
      v-for="(pin, index) in pins"
      :key="index"
      class="pin"
      :style="{ left: `${round(pin.value * 100)}%` }"
    >
      {{ pin.label }}
    </span>
    <span class="thumb" :style="thumbStyle" />
    <slot />
  </div>
</template>

<script>
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
    }
  },

  computed: {
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
          .find(pin => pin + pinRange >= value && pin - pinRange <= value) || value
      )
    },

    round,

    // Events Handlers
    handleInput(event) {
      this.$emit('input', this.calcValue(event))
    },
    handleChange(event) {
      this.$emit('change', this.calcValue(event))
    },
    handleDblclick(event) {
      this.$emit('dblclick', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'tokens/defaults';
@import 'tokens/input';
@import 'tokens/progress';
@import 'tokens/color';
@import 'font';
@import 'resets';

.input-slider {
  @extend %font;
  @include range($height, $thumb-width-desktop, $thumb-width-desktop-hover);

  width: 100%;
  position: relative;
  height: $slider-height;
  margin: 0 1em;

  .track {
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
    height: 3px;
    pointer-events: none;
    background-color: $subtile-color;
    border-radius: 2px;
  }

  .pin {
    position: absolute;
    top: -10px;
    color: $subtile-color;
    font-weight: 500;
    font-size: 1em;
    display: block;
    width: 30px;
    margin-left: -15px;
    text-align: center;
  }

  .thumb {
    position: absolute;
    top: calc(50% - 12px);
    border: 1px solid;
    height: 24px;
    width: 24px;
    pointer-events: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 12px;
    border-color: $subtile-color;
    margin-left: -12px;
  }
}
</style>
