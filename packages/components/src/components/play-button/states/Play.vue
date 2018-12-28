<template>
  <span class="inner" aria-hidden="true">
    <play-icon :size="size" :color="color"></play-icon>
    <slot></slot>
  </span>
</template>

<script>
  import { PlayIcon } from 'icons'
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
      PlayIcon
    }
  }
</script>

<style lang="scss" scoped>
  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 3px;
  }
</style>
