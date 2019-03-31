<template>
  <span class="play-inner" aria-hidden="true">
    <icon type="play" :color="color" />
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
.play-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
}
</style>
