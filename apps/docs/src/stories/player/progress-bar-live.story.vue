<template>
  <Story title="Player/Progress Bar Live" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style" class="p-5">
      <progress-bar-live></progress-bar-live>
    </player>
    <template #controls>
      <HstColor v-model="progressColor" title="Progress Color" />
      <HstColor v-model="trackColor" title="Track Color" />
      <HstColor v-model="thumbColor" title="Thumb Color" />
      <HstColor v-model="thumbBorderColor" title="Thumb Border Color" />
      <HstColor v-model="ghostColor" title="Ghost Color" />
      <HstColor v-model="ghostBorderColor" title="Ghost Border Color" />
      <HstColor v-model="bufferBackground" title="Buffer Background Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { fade } from 'farbraum';
import { isNegative, light, dark } from '@podlove/utils/color';

import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const progressColor = ref(config.theme.tokens.brandDark);
const trackColor = ref(config.theme.tokens.brandDark);
const thumbColor = ref(config.theme.tokens.brandDark);
const thumbBorderColor = ref(config.theme.tokens.brandLightest);
const ghostColor = ref(fade(config.theme.tokens.brandDark, 0.2));
const ghostBorderColor = ref(config.theme.tokens.brandLightest);

const bufferBackground = computed(() =>
  isNegative(progressColor.value) ? fade(light, 0.5) : fade(dark, 0.7)
);

const style = ref({
  '--podlove-player--progress-bar-live--progress-color': progressColor,
  '--podlove-player--progress-bar-live--track-color': trackColor,
  '--podlove-player--progress-bar-live--thumb-color': thumbColor,
  '--podlove-player--progress-bar-live--thumb-border-color': thumbBorderColor,
  '--podlove-player--progress-bar-live--ghost-color': ghostColor,
  '--podlove-player--progress-bar-live--ghost-border-color': ghostBorderColor,
  '--podlove-player--progress-bar-live--buffer-background-color': bufferBackground
});

const source = computed(
  () => `
  <div style="${inlineStyles(style)}">
    <progress-bar-live></progress-bar-live>
  </div>
`
);
</script>
