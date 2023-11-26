<template>
  <Story title="Player/Components/Show Title" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="p-5">
        <show-title></show-title>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import '@podlove/player';

import config from '../data/config.json';

const color = ref(config.theme.tokens.brand);

const style = ref({
  '--podlove-player--show-title--color': color
});
</script>
