<template>
  <component
    :is="iconType"
    :color="color"
    :background="background"
    :size="size"
    :filled="filled"
    aria-hidden="true"
  />
</template>

<script>
import { components, types } from './types'

export default {
  components,
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => types.includes(val)
    },
    background: {
      type: String,
      default: 'currentColor'
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: Number,
      default: undefined
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconType() {
      return `${this.type}-icon`
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
</style>
