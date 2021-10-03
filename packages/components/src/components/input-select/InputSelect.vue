<template>
  <select
    v-if="options"
    :style="style"
    class="input-select block w-full border rounded-none p-1 h-8"
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
  emits: {
    change: null
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
.input-select {
  -webkit-appearance: none;
}
</style>
