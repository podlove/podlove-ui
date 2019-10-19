<template>
  <a :href="xingLink" class="channel-link" target="_blank">
    <span :style="style" class="channel-icon xing" aria-hidden="true">
      <icon type="xing" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'
import { addQueryParameter } from '@podlove/utils/url'

const LINK = 'https://www.xing.com/spi/shares/new'

export default {
  components: {
    Icon
  },
  props: {
    link: {
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
      default: '#3b5998'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    xingLink() {
      return addQueryParameter(LINK, { url: this.link })
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
