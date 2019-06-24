<template lang="pug">
  ul.flex.justify-space-between#tab-share-channels
    li(v-for="(channel, index) in channels" :key="index" :id="`tab-share--channels--${channel}`")
      component(:is="`${channel}-channel`")
</template>

<script>
import { mapState } from 'redux-vuex'

import select from 'store/selectors'

import FacebookChannel from './channels/Facebook'
import TwitterChannel from './channels/Twitter'
import MailChannel from './channels/Mail'
import LinkChannel from './channels/Link'
import LinkedinChannel from './channels/Linkedin'
import PinterestChannel from './channels/Pinterest'
import RedditChannel from './channels/Reddit'

export default {
  components: {
    FacebookChannel,
    TwitterChannel,
    MailChannel,
    LinkChannel,
    LinkedinChannel,
    PinterestChannel,
    RedditChannel
  },
  data: mapState({
    channels: select.channels
  })
}
</script>
