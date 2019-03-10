<template>
  <component
    class="channel-link"
    :is="`${type}-channel`"
    :color="color"
    :subject="subject"
    :link="link"
    :text="text"
    :a11y="a11y"
    :poster="poster"
    @click.native="clickHandler"
  />
</template>

<script>
import { selectChannel } from '@podlove/player-actions/share'

import { background } from 'defaults'
import EmbedChannel from './states/Embed'
import TwitterChannel from './states/Twitter'
import RedditChannel from './states/Reddit'
import PinterestChannel from './states/Pinterest'
import MailChannel from './states/Mail'
import LinkedinChannel from './states/Linkedin'
import FacebookChannel from './states/Facebook'

export default {
  props: {
    color: {
      type: String,
      default: background
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
      validator: val => ['embed', 'facebook', 'linkedin', 'mail', 'reddit', 'twitter', 'pinterest'].includes(val)
    }
  },

  components: {
    EmbedChannel,
    TwitterChannel,
    RedditChannel,
    PinterestChannel,
    MailChannel,
    LinkedinChannel,
    FacebookChannel
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
