<template>
  <a :href="twitterLink" class="channel-link" target="_blank">
    <span class="channel-icon twitter" aria-hidden="true" :style="style">
      <icon :color="color" type="twitter" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import Icon from '../../icons'

const LINK = 'https://twitter.com/intent/tweet'

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
      default: '#1da1f2'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    twitterLink() {
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
