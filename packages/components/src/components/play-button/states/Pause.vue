<template>
  <span class="pause-inner" aria-hidden="true">
    <icon type="pause" :color="color" />
    <slot />
  </span>
</template>

<script>
import Icon from 'components/icons'
import { color } from 'defaults'

export default {
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: color
    }
  }
}
</script>

<style lang="scss" scoped>
.pause-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
