<template>
  <a :href="mailLink" class="channel-link">
    <span class="channel-icon mail" aria-hidden="true"><icon type="mail" color="#fff"/></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
import Icon from '../../icons'
import { addQueryParameter } from '@podlove/utils/url'

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
    }
  },
  computed: {
    mailLink() {
      return addQueryParameter(LINK, { body: this.text, subject: this.subject })
    }
  }
}
</script>

<style lang="scss">
@import 'channel';

.channel-icon.mail {
  background-color: $channel-mail-color;
}
</style>
