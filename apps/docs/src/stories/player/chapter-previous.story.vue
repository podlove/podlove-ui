<template>
  <Story title="Player/Previous Chapter" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style">
      <chapter-previous></chapter-previous>
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

const color = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--chapter-previous--color': color
});

const source = computed(() =>`<div :style="${inlineStyles(style)}">
  <chapter-previous></chapter-previous>
</div>`);
</script>
