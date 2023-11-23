<script lang="ts">
import {
  LinkChannel,
  RedditChannel,
  MailChannel,
  XingChannel,
  EmbedChannel,
  TwitterChannel,
  FacebookChannel,
  LinkedinChannel,
  WhatsAppChannel,
  PinterestChannel
} from '@podlove/components';

export default {
  components: {
    LinkChannel,
    RedditChannel,
    MailChannel,
    XingChannel,
    EmbedChannel,
    TwitterChannel,
    FacebookChannel,
    LinkedinChannel,
    WhatsAppChannel,
    PinterestChannel
  }
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';
import { charcoal, saffron } from '../colors.js';

const type = ref('embedChannel');
const color = ref(saffron);
const background = ref(charcoal);

const filled = ref(false);
const link = ref('');
const subject = ref('');
const text = ref('');
const a11y = ref('');

const style = ref({
  '--podlove-component--channel--color': color,
  '--podlove-component--channel--background': background
});
</script>

<template>
  <Story title="Components/Channel" auto-props-disabled>
    <component :is="type" :style="style" :type="type" @click="logEvent('click', $event)" />

    <template #controls>
      <HstSelect
        v-model="type"
        title="Type"
        :options="[
          'embedChannel',
          'facebookChannel',
          'linkedinChannel',
          'mailChannel',
          'redditChannel',
          'twitterChannel',
          'xingChannel',
          'whatsappChannel',
          'pinterestChannel',
          'linkChannel'
        ]"
      />

      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstCheckbox v-model="filled" title="Filled" />
      <HstText v-model="link" title="Link" />
      <HstText v-model="subject" title="Subject" />
      <HstText v-model="text" title="Text" />
      <HstText v-model="a11y" title="A11y" />
    </template>
  </Story>
</template>
