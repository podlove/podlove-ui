<template>
  <Story title="Player/Components/Poster" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="p-5 flex items-center justify-center">
        <poster></poster>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="posterBackground" title="Poster Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/player';

import config from '../data/config.json';

const posterBackground = ref(config.theme.tokens.brandLightest);

const style = ref({
  '--podlove-player--poster--background': posterBackground
});
</script>
