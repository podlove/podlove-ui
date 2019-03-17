<template>
  <a :href="pinterestLink" class="channel-link" target="_blank">
    <span class="channel-icon pinterest" aria-hidden="true"><icon type="pinterest" color="#fff"/></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import Icon from '../../icons'

const LINK = 'https://pinterest.com/pin/create/bookmarklet/'

export default {
  props: {
    link: {
      type: String
    },
    text: {
      type: String
    },
    poster: {
      type: String
    },
    a11y: {
      type: String
    }
  },
  computed: {
    pinterestLink () {
      return addQueryParameter(LINK, { url: this.link, media: this.poster, is_video: false, description: this.text })
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import 'channel';

.channel-icon.pinterest {
  background-color: $channel-pinterest-color;
}
</style>
