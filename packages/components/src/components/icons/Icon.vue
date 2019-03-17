<template>
  <component :is="iconType" :color="color" :background="background" :size="size" aria-hidden="true" />
</template>

<script>
import { capitalize } from '@podlove/utils/helper'
import { background, color } from 'defaults'

import { components, types } from './types'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: val => types.includes(val)
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
      type: Number
    }
  },
  computed: {
    iconType () {
      return `${this.type}-icon`
    }
  },
  components
}
</script>

<style lang="scss" scoped>
@import 'boot';
</style>
