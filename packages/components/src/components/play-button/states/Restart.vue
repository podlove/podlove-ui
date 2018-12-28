<template>
  <span class="inner" aria-hidden="true">
    <reload-icon :size="size" :color="color"></reload-icon>
    <slot></slot>
  </span>
</template>

<script>
  import { ReloadIcon } from 'icons'
  import { color } from 'defaults'

  export default {
    props: {
      color: {
        type: String,
        default: color
      },
      size: {
        type: Number
      }
    },
    components: {
      ReloadIcon
    }
  }
</script>

<style lang="scss" scoped>
  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
