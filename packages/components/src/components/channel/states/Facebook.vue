<template>
  <channel-base v-bind="$props" type="link" :href="facebookLink">
    <icon type="facebook" :filled="filled" />
  </channel-base>
</template>

<script>
import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons'

const LINK = 'https://www.facebook.com/sharer/sharer.php'

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
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    facebookLink() {
      return addQueryParameter(LINK, { u: this.link })
    }
  }
}
</script>
