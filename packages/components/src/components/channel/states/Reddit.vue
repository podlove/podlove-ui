<template>
  <channel-base v-bind="$props" type="link" :link="redditLink">
    <icon type="reddit" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons'

const LINK = 'http://reddit.com/submit'

export default {
  components: {
    ChannelBase,
    Icon
  },
  props: {
    text: {
      type: String,
      default: ''
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
    redditLink() {
      return addQueryParameter(LINK, { url: this.link, title: this.text })
    }
  }
}
</script>
