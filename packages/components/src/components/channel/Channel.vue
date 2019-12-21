<template>
  <component
    :is="`${type}-channel`"
    class="channel-link"
    :color="color"
    :background="background"
    :subject="subject"
    :link="link"
    :text="text"
    :a11y="a11y"
    :filled="filled"
    :poster="poster"
    @click.native="clickHandler"
  />
</template>

<script>
import { selectChannel } from '@podlove/player-actions/share'

import { background, color } from 'defaults'
import EmbedChannel from './states/Embed'
import TwitterChannel from './states/Twitter'
import RedditChannel from './states/Reddit'
import PinterestChannel from './states/Pinterest'
import MailChannel from './states/Mail'
import LinkChannel from './states/Link'
import LinkedinChannel from './states/Linkedin'
import FacebookChannel from './states/Facebook'
import XingChannel from './states/Xing'
import WhatsAppChannel from './states/WhatsApp'

export default {
  components: {
    EmbedChannel,
    TwitterChannel,
    RedditChannel,
    PinterestChannel,
    MailChannel,
    LinkChannel,
    LinkedinChannel,
    FacebookChannel,
    XingChannel,
    WhatsAppChannel
  },
  props: {
    color: {
      type: String,
      default: color
    },
    background: {
      type: String,
      default: background
    },
    filled: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: null
    },
    subject: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    a11y: {
      type: String,
      default: null
    },
    poster: {
      type: String,
      default: null
    },
    type: {
      type: String,
      required: true,
      validator: val =>
        [
          'embed',
          'facebook',
          'linkedin',
          'mail',
          'reddit',
          'twitter',
          'xing',
          'whats-app',
          'pinterest',
          'link'
        ].includes(val)
    }
  },

  methods: {
    clickHandler() {
      this.$emit('click', selectChannel(this.type))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
</style>
