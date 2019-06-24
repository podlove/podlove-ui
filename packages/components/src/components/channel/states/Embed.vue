<template>
  <button class="channel-link">
    <span class="channel-icon" :style="iconStyle" aria-hidden="true">
      <icon type="embed" :color="color" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </button>
</template>

<script>
import Icon from '../../icons'

export default {
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    subject: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'transparent'
    },
    background: {
      type: String,
      default: null
    },
    a11y: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconStyle() {
      return {
        'background-color': this.background
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';
</style>
