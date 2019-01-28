<template>
  <span class="restart-inner" aria-hidden="true">
    <icon type="restart" :color="color"></icon>
    <slot></slot>
  </span>
</template>

<script>
  import Icon from 'components/icons'
  import { color } from 'defaults'

  export default {
    props: {
      color: {
        type: String,
        default: color
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  .restart-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
