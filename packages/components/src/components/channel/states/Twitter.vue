<template>
  <a :href="twitterLink" class="channel-link" target="_blank">
    <span class="channel-icon twitter" aria-hidden="true"><icon color="#fff" type="twitter"/></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import Icon from '../../icons'

const LINK = 'https://twitter.com/intent/tweet'

export default {
  props: {
    text: {
      type: String
    },
    color: {
      type: String
    },
    a11y: {
      type: String
    }
  },
  computed: {
    twitterLink () {
      return addQueryParameter(LINK, { text: this.text })
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import 'channel';

.channel-icon.twitter {
  background-color: $channel-twitter-color;
}
</style>
