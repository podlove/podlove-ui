<template>
  <channel-base v-bind="$props" type="link" :link="pinterestLink">
    <icon type="pinterest" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons'

const LINK = 'https://pinterest.com/pin/create/bookmarklet/'

export default {
  components: {
    ChannelBase,
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
    color: {
      type: String,
      default: '#fff'
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
    }
  }
}
</script>
