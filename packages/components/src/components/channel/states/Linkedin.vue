<template>
  <a :href="linkedinLink" class="channel-link" target="_blank">
    <span class="channel-icon Linkedin" aria-hidden="true" :style="style">
      <icon type="linkedin" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'
import { addQueryParameter } from '@podlove/utils/url'

const LINK = 'https://www.linkedin.com/shareArticle'

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
    subject: {
      type: String,
      default: ''
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
      default: '#0077B5'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    linkedinLink() {
      return addQueryParameter(LINK, { url: this.link, mini: true, summary: this.text })
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
