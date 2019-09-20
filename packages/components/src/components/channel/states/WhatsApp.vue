<template>
  <a :href="whatsAppLink" class="channel-link" target="_blank">
    <span :style="style" class="channel-icon xing" aria-hidden="true">
      <icon type="whats-app" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'
import { addQueryParameter } from '@podlove/utils/url'

const LINK = 'whatsapp://send'

export default {
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      default: ''
    },
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
      default: '#3b5998'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    whatsAppLink() {
      return addQueryParameter(LINK, { text: this.text })
    },
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
