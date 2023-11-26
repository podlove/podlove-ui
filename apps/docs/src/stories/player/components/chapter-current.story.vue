<template>
  <Story title="Player/Components/Chapter Current Title" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="flex justify-center content-center p-2" :style="style">
        <current-chapter></current-chapter>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import '@podlove/player';
import { ref } from 'vue';

import config from '../data/config.json';

const color = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--chapter-current--color': color
});
</script>
