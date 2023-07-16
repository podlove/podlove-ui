<template>
  <ul
    class="podlove-player--tab-share--channels flex flex-wrap justify-space-between"
    data-test="tab-share--channels"
  >
    <li
      v-for="channel in channels"
      :key="`channel-${channel}`"
      :data-test="`tab-share--channels--${channel}`"
    >
      <component
        :is="channelComponent[channel]"
        :aria-label="t(state.a11y(channel).key, state.a11y(channel).attr)"
        :a11y="t(state.a11y(channel).key, { channel })"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { computed } from 'vue';

const { t } = useI18n();

import select from '../../../store/selectors/index.js';

import FacebookChannel from './channels/Facebook.vue';
import TwitterChannel from './channels/Twitter.vue';
import MailChannel from './channels/Mail.vue';
import LinkChannel from './channels/Link.vue';
import LinkedinChannel from './channels/Linkedin.vue';
import PinterestChannel from './channels/Pinterest.vue';
import RedditChannel from './channels/Reddit.vue';
import XingChannel from './channels/Xing.vue';
import WhatsAppChannel from './channels/WhatsApp.vue';

const state = mapState({
  channels: select.channels,
  a11y: select.accessibility.shareChannel
});

const channelComponent = {
  facebook: FacebookChannel,
  twitter: TwitterChannel,
  mail: MailChannel,
  link: LinkChannel,
  linkedin: LinkedinChannel,
  pinterest: PinterestChannel,
  reddit: RedditChannel,
  xing: XingChannel,
  whatsapp: WhatsAppChannel
};

const channels = computed(() => Object.values(state.channels) as unknown as string);
</script>

<style lang="postcss" scoped>
.podlove-player--tab-share--channels {
  --podlove-component--channel--color: var(--podlove-player--tab-share--channels--color);
  --podlove-component--channel--background: var(--podlove-player--tab-share--channels--background);
}
</style>
