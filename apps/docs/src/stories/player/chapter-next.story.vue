<template>
  <Story title="Player/Next Chapter" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style">
      <chapter-next></chapter-next>
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
  '--podlove-player--chapter-next--color': color
});

const source = computed(() =>`<div :style="${inlineStyles(style)}">
  <chapter-next></chapter-next>
</div>`);
</script>
