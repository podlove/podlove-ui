<template>
  <span class="flex justify-center items-center" aria-hidden="true">
    <icon type="restart" :color="color" :size="size" />
    <slot />
  </span>
</template>

<script>
import Icon from '../../icons/Icon'
import { color } from '../../../defaults'

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
