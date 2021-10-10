<template>
  <div class="pt-0 pb-0 pr-4 pl-4" aria-hidden="true">
    <icon :color="color" type="loading" :size="size" />
  </div>
</template>

<script>
import { color } from 'defaults'
import Icon from '../../icons'

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
