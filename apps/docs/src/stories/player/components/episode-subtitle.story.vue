<template>
  <Story title="Player/Components/Episode Subtitle" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="p-2" :style="style">
        <episode-subtitle></episode-subtitle>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/player';

import config from '../data/config.json';

const color = ref(config.theme.tokens.contrast);

const style = ref({
  '--podlove-player--episode-subtitle--color': color
});
</script>
