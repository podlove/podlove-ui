<template>
  <div class="loading-indicator" aria-hidden="true">
    <icon :color="color" type="loading" :size="size" />
  </div>
</template>

<script>
import { color } from 'defaults'
import Icon from 'components/icons'

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

<style lang="scss" scoped>
.loading-indicator {
  padding: 0 15px;
}
</style>
