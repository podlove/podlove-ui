<script setup lang="ts">
import { selectChannel } from '@podlove/player-actions/share';
import { PodloveWebPlayerChannel } from '@podlove/types';

import EmbedChannel from './states/Embed.vue';
import TwitterChannel from './states/Twitter.vue';
import RedditChannel from './states/Reddit.vue';
import PinterestChannel from './states/Pinterest.vue';
import MailChannel from './states/Mail.vue';
import LinkChannel from './states/Link.vue';
import LinkedinChannel from './states/Linkedin.vue';
import FacebookChannel from './states/Facebook.vue';
import XingChannel from './states/Xing.vue';
import WhatsAppChannel from './states/WhatsApp.vue';

const props = defineProps<{
  filled?: boolean;
  link?: string;
  subject?: string;
  text?: string;
  a11y?: string;
  type: PodloveWebPlayerChannel;
}>();

const emit = defineEmits(['click']);

const clickHandler = () => {
  emit('click', selectChannel(props.type as PodloveWebPlayerChannel));
};

const channels: { [key: string]: any } = {
  embed: EmbedChannel,
  facebook: FacebookChannel,
  linkedin: LinkedinChannel,
  mail: MailChannel,
  reddit: RedditChannel,
  twitter: TwitterChannel,
  xing: XingChannel,
  'whats-app': WhatsAppChannel,
  pinterest: PinterestChannel,
  link: LinkChannel
};
</script>

<template>
  <component
    :is="channels[props.type]"
    class="podlove-component-channel"
    :subject="props.subject"
    :link="props.link"
    :text="props.text"
    :a11y="props.a11y"
    :filled="!!props.filled"
    :poster="props.poster"
    @click="clickHandler"
  />
</template>

<style lang="postcss" scoped>
.podlove-component-channel {
  --podlove-component-icon-color: var(
    --podlove-component-channel-color,
    var(--podlove-components-text)
  );
  background-color: var(
    --podlove-component-channel-background,
    var(--podlove-components-background)
  );
}
</style>
