<template>
  <Story title="Player/Poster" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style" class="p-5">
      <poster></poster>
    </player>
    <template #controls>
      <HstColor v-model="posterBackground" title="Poster Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const posterBackground = ref(config.theme.tokens.brandLightest);

const style = ref({
  '--podlove-player--poster--background': posterBackground
});

const source = computed(
  () => `
  <div style="${inlineStyles(style)}">
    <poster></poster>
  </div>
`
);
</script>
