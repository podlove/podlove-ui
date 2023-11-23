<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { Image } from '@podlove/components';
import { saffron } from '../colors.js';

const color = ref(saffron);
const alt = ref('Image Alt text');
const url = ref('https://via.placeholder.com/1500');
const style = ref({
  '--podlove-component--image--background': color
});
</script>

<template>
  <Story title="Components/Image" auto-props-disabled>
    <Image
      class="w-80 h-80"
      :style="style"
      :alt="alt"
      :url="url"
      @onLoad="logEvent('onLoad', $event)"
      @onError="logEvent('onError', $event)"
    />

    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstText v-model="url" title="Url" />
      <HstText v-model="alt" title="Alt" />
    </template>
  </Story>
</template>
