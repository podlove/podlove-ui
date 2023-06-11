<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { Channel } from '@podlove/components';
import { charcoal, saffron } from '../colors.js';

const type = ref('embed');
const color = ref(saffron);
const background = ref(charcoal);

const filled = ref(false)
const link = ref('')
const subject = ref('')
const text = ref('')
const a11y = ref('')

const style = ref({
  '--podlove-component-channel-color': color,
  '--podlove-component-channel-background': background
});
</script>

<template>
  <Story title="Components/Channel" auto-props-disabled>
    <Channel :style="style" :type="type" @click="logEvent('click', $event)" />

    <template #controls>
      <HstSelect
        v-model="type"
        title="Type"
        :options="[
          'embed',
          'facebook',
          'linkedin',
          'mail',
          'reddit',
          'twitter',
          'xing',
          'whatsapp',
          'pinterest',
          'link'
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
