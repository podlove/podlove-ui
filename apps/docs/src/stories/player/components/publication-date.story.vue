<template>
  <Story title="Player/Components/Publication Date" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="p-5">
        <publication-date></publication-date>
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
  '--podlove-player--publication-date--color': color
});
</script>
