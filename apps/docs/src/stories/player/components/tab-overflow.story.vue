<template>
  <Story title="Player/Components/Tab Overflow" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="relative w-48 h-5">
        <tab-overflow :style="style"></tab-overflow>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="colorStart" title="Color Start" />
      <HstColor v-model="colorStop" title="Color Stop" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { fade } from 'farbraum';
import '@podlove/player';
import config from '../data/config.json';

const colorStart = ref(fade(config.theme.tokens.contrast, 1));
const colorStop = ref(config.theme.tokens.brandDark);

const style = computed(() => ({
  '--podlove-player--tab-overflow--start': colorStart.value,
  '--podlove-player--tab-overflow--stop': colorStop.value
}));
</script>
