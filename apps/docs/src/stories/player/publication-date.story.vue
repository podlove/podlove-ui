<template>
  <Story title="Player/Publication Date" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style">
      <publication-date></publication-date>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const color = ref(config.theme.tokens.contrast);

const style = ref({
  '--podlove-player--publication-date--color': color
});

const source = computed(
  () => `<div :style="${inlineStyles(style)}">
  <publication-date></publication-date>
</div>`
);
</script>
