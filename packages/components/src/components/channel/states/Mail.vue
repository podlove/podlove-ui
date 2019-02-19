<template>
  <a :href="mailLink" class="channel-link">
    <span class="channel-icon mail" aria-hidden="true"><icon type="mail" color="#fff" /></span>
    <span class="visually-hidden">{{ a11y }}</span>
  </a>
</template>

<script>
  import Icon from '../../icons'
  import { addQueryParameter } from '@podlove/utils/url'

  const LINK = 'mailto:'

  export default {
    props: {
      text: {
        type: String
      },
      subject: {
        type: String
      },
      color: {
        type: String
      },
      a11y: {
        type: String
      }
    },
    computed: {
      mailLink () {
        return addQueryParameter(LINK, { body: this.text, subject: this.subject })
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  @import 'channel';

  .channel-icon.mail {
    background-color: $channel-mail-color;
  }
</style>
