<template>
  <select
    v-if="options"
    :style="style"
    class="input-select"
    :disabled="disabled"
    @change="changeEvent"
  >
    <option v-for="(option, index) in options" :key="index" :selected="option === value">
      {{ option }}
    </option>
  </select>
  <select v-else :style="style" class="input-select" :disabled="disabled" @change="changeEvent">
    <slot />
  </select>
</template>

<script>
import * as defaultColors from 'defaults'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: defaultColors.background
    },
    background: {
      type: String,
      default: defaultColors.color
    },
    borderColor: {
      type: String,
      default: defaultColors.background
    },
    value: {
      type: String,
      default: null
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
  },
  methods: {
    changeEvent(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style lang="scss">
@import 'boot';
@import 'tokens/defaults';
@import 'tokens/input';

.input-select {
  display: block;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-radius: 0;
  padding: $padding / 4;
  height: $input-height;

  -webkit-appearance: none;
}
</style>
