<template>
  <a :href="mailLink" class="channel-link">
    <span class="channel-icon mail" aria-hidden="true" :style="style">
      <icon type="mail" :color="color" :filled="filled" />
    </span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'
import { queryParameter } from '@podlove/utils/url'

const LINK = 'mailto:'

export default {
  components: {
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
      default: '#888'
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mailLink() {
      return `${LINK}?${queryParameter({ body: this.text, subject: this.subject })}`
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
