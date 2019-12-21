<template>
  <div class="divider" :style="style"></div>
</template>

<script>
import { background } from 'defaults'

export default {
  props: {
    color: {
      type: String,
      default: background
    }
  },
  computed: {
    style() {
      return {
        'background-image': `linear-gradient(90deg,${this.color} 25%,rgba(128,126,124,0) 0)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  background-position: 0 100%;
  background-size: 4px 1px;
  background-repeat: repeat-x;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
}
</style>
