<template>
  <span class="flex justify-center items-center pl-1" aria-hidden="true">
    <icon type="play" :color="color" :size="size" />
    <slot />
  </span>
</template>

<script>
import { color } from '../../../defaults'
import Icon from '../../icons/Icon'

export default {
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: color
    },
    size: {
      type: Number,
      default: 25
    }
  }
}
</script>

<style lang="scss" scoped></style>
