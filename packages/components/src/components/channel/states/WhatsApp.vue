<template>
  <channel-base v-bind="$props" type="link" :href="whatsAppLink">
    <icon type="whats-app" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons/Icon'

const LINK = 'whatsapp://send'

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
    whatsAppLink() {
      return addQueryParameter(LINK, { text: this.text })
    }
  }
}
</script>
