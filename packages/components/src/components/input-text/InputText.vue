<template>
  <input
    class="input-text box-border inline-block resize-none p-1 border border-solid rounded-sm h-8"
    :class="{ 'w-full block': block }"
    :disabled="disabled"
    :value="value"
    :style="style"
  />
</template>

<script>
import { color, background } from '../../defaults'

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

<style lang="scss" scoped></style>
