<template>
  <Story title="Player/Tab Overflow" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <div class="relative w-48 h-5">
        <tab-overflow :style="style"></tab-overflow>
      </div>
    </player>

    <template #controls>
      <HstColor v-model="colorStart" title="Color Start" />
      <HstColor v-model="colorStop" title="Color Stop" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const colorStart = ref(config.theme.tokens.contrast);
const colorStop = ref(config.theme.tokens.brandDark);

const style = computed(() => ({
  '--podlove-player--tab-overflow--start': colorStart.value,
  '--podlove-player--tab-overflow--stop': colorStop.value,
}))

const source = computed(
  () => `<div class="relative w-48 h-5" style="${inlineStyles(style)}">
    <tab-overflow></tab-overflow>
</div>`
);
</script>
