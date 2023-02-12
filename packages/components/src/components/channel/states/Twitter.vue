<template>
  <channel-base v-bind="$props" type="link" :href="twitterLink">
    <icon type="twitter" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons/Icon'

const LINK = 'https://twitter.com/intent/tweet'

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
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    twitterLink() {
      return addQueryParameter(LINK, { text: this.text })
    }
  }
}
</script>
