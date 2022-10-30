<template>
  <channel-base v-bind="$props" type="link" :href="xingLink">
    <icon type="xing" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons/Icon'

const LINK = 'https://www.xing.com/spi/shares/new'

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
    xingLink() {
      return addQueryParameter(LINK, { url: this.link })
    }
  }
}
</script>
