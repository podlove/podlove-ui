<template>
  <a :href="pinterestLink" class="channel-link" target="_blank">
    <span class="channel-icon pinterest" aria-hidden="true">
      <icon type="pinterest" color="#fff" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import Icon from '../../icons'

const LINK = 'https://pinterest.com/pin/create/bookmarklet/'

export default {
  components: {
    Icon
  },
  props: {
    link: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: null
    },
    a11y: {
      type: String,
      default: ''
    }
  },
  computed: {
    pinterestLink() {
      return addQueryParameter(LINK, {
        url: this.link,
        media: this.poster,
        is_video: false,
        description: this.text
      })
    }
  }
}
</script>

<style lang="scss">
@import 'channel';

.channel-icon.pinterest {
  background-color: $channel-pinterest-color;
}
</style>
