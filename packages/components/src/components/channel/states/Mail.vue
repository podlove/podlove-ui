<template>
  <channel-base v-bind="$props" type="link" :link="mailLink">
    <icon type="mail" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
import { queryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons'

const LINK = 'mailto:'

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
    subject: {
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
    mailLink() {
      return `${LINK}?${queryParameter({ body: this.text, subject: this.subject })}`
    }
  }
}
</script>

