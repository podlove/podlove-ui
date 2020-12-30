<template>
  <ul class=".flex.flex-wrap.justify-space-between" data-test="tab-share--channels">
    <li
      v-for="(channel, index) in state.channels"
      :key="`channel-${index}`"
      :data-test="`tab-share--channels--${channel}`"
    >
      <component
        :is="`${channel}-channel`"
        :aria-label="$t(state.a11y(channel).key, state.a11y(channel).attr)"
        :a11y="$t(state.a11y.key, { channel })"
      />
    </li>
  </ul>
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
import XingChannel from './channels/Xing'
import WhatsAppChannel from './channels/WhatsApp'

export default {
  components: {
    FacebookChannel,
    TwitterChannel,
    MailChannel,
    LinkChannel,
    LinkedinChannel,
    PinterestChannel,
    RedditChannel,
    XingChannel,
    WhatsAppChannel
  },
  setup() {
    return {
      state: mapState({
        channels: select.channels,
        a11y: select.accessibility.shareChannel
      })
    }
  }
}
</script>
