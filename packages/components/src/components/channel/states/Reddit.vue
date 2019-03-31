<template>
  <a :href="redditLink" class="channel-link" target="_blank">
    <span class="channel-icon reddit" aria-hidden="true"><icon type="reddit" color="#fff"/></span>
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
    }
  },
  computed: {
    redditLink() {
      return addQueryParameter(LINK, { url: this.link, title: this.text })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';

.channel-icon.reddit {
  background-color: $channel-reddit-color;
}
</style>
