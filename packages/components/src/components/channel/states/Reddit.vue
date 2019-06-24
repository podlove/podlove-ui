<template>
  <a :href="redditLink" class="channel-link" target="_blank">
    <span class="channel-icon reddit" aria-hidden="true" :style="style">
      <icon type="reddit" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'

import Icon from '../../icons'

const LINK = 'http://reddit.com/submit'

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
      default: '#FF4500'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    redditLink() {
      return addQueryParameter(LINK, { url: this.link, title: this.text })
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
