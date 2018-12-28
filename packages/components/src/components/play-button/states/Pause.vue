<template>
  <span class="inner" aria-hidden="true">
    <pause-icon :size="size" :color="color"></pause-icon>
    <slot></slot>
  </span>
</template>

<script>
  import { PauseIcon } from 'icons'
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
      PauseIcon
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
