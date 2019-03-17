<template>
  <button class="channel-link">
    <span class="channel-icon" :style="iconStyle" aria-hidden="true"><icon type="embed" color="#fff"/></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </button>
</template>

<script>
import Icon from '../../icons'

export default {
  props: {
    text: {
      type: String
    },
    subject: {
      type: String
    },
    color: {
      type: String,
      default: 'transparent'
    },
    a11y: {
      type: String
    }
  },
  computed: {
    iconStyle () {
      return {
        'background-color': this.color
      }
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';
</style>
