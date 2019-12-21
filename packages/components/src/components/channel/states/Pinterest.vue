<template>
  <a :href="pinterestLink" class="channel-link" target="_blank">
    <span class="channel-icon pinterest" aria-hidden="true" :style="style">
      <icon type="pinterest" :color="color" :filled="filled" />
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
    },
    color: {
      type: String,
      default: '#fff'
    },
    background: {
      type: String,
      default: '#BD081C'
    },
    filled: {
      type: Boolean,
      default: false
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
