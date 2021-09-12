<template>
  <channel-base v-bind="$props" type="link" :href="linkedinLink">
    <icon type="linkedin" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
// import { addQueryParameter } from '@podlove/utils/url'
import ChannelBase from './Base'
import Icon from '../../icons'

const LINK = 'https://www.linkedin.com/shareArticle'

export default {
  components: {
    Icon,
    ChannelBase
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
    linkedinLink() {
      return ''
      // return addQueryParameter(LINK, { url: this.link, mini: true, summary: this.text })
    }
  }
}
</script>
