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
  props: {
    link: {
      type: String
    },
    text: {
      type: String
    },
    a11y: {
      type: String
    }
  },
  computed: {
    redditLink () {
      return addQueryParameter(LINK, { url: this.link, title: this.text })
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';

.channel-icon.reddit {
  background-color: $channel-reddit-color;
}
</style>
