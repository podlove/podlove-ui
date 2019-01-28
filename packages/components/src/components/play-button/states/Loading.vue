<template>
  <div class="loading-indicator" aria-hidden="true">
    <icon :color="color" type="loading"></icon>
  </div>
</template>

<script>
  import { color } from 'defaults'
  import Icon from 'components/icons'

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
  .loading-indicator {
    padding: 0 15px;
  }
</style>
