<template>
  <input class="input-text" :class="{ block }" :disabled="disabled" :value="value" :style="style" />
</template>

<script>
import { color, background } from 'defaults'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: background
    },

    borderColor: {
      type: String,
      default: background
    },

    background: {
      type: String,
      default: color
    },

    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
        background: this.background,
        'border-color': this.borderColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'tokens/defaults';
@import 'tokens/input';

.input-text {
  box-sizing: border-box;
  display: inline-block;
  resize: none;
  padding: $padding / 4;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  height: $input-height;

  &.block {
    display: block;
    width: 100%;
  }
}
</style>
