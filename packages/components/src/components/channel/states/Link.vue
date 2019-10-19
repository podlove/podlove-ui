<template>
  <a class="channel-link">
    <span class="channel-icon link" aria-hidden="true" :style="style">
      <icon type="link" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'

export default {
  components: {
    Icon
  },
  props: {
    a11y: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    background: {
      type: String,
      default: '#888'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        background: this.background
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';
</style>
