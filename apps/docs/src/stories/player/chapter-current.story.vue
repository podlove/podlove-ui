<template>
  <Story title="Player/Current Chapter" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style">
      <current-chapter></current-chapter>
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
  '--podlove-player--chapter-current--color': color
});

const source = computed(
  () => `<div :style="${inlineStyles(style)}">
  <current-chapter></current-chapter>
</div>`
);
</script>
