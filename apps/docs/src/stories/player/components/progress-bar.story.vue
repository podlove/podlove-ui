<template>
  <Story title="Player/Components/Progress Bar" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="p-5">
        <progress-bar></progress-bar>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="progressColor" title="Progress Color" />
      <HstColor v-model="chapterBackgroundColor" title="Chapter Background Color" />
      <HstColor v-model="chapterSeperatorColor" title="Chapter Seperator Color" />
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
import '@podlove/player';

import config from '../data/config.json';

const progressColor = ref(fade(config.theme.tokens.brandDark, 0.7));
const chapterBackgroundColor = ref(config.theme.tokens.brandDark);
const chapterSeperatorColor = ref(config.theme.tokens.brandLightest);
const trackColor = ref(config.theme.tokens.brandDark);
const thumbColor = ref(config.theme.tokens.brandDark);
const thumbBorderColor = ref(config.theme.tokens.brandLightest);
const ghostColor = ref(fade(config.theme.tokens.brandDark, 0.2));
const ghostBorderColor = ref(config.theme.tokens.brandLightest);

const bufferBackground = computed(() =>
  isNegative(progressColor.value) ? fade(light, 0.5) : fade(dark, 0.7)
);

const style = ref({
  '--podlove-player--progress-bar--progress-color': progressColor,
  '--podlove-player--progress-bar--chapter-separator-color': chapterSeperatorColor,
  '--podlove-player--progress-bar--chapter-background-color': chapterBackgroundColor,
  '--podlove-player--progress-bar--track-color': trackColor,
  '--podlove-player--progress-bar--thumb-color': thumbColor,
  '--podlove-player--progress-bar--thumb-border-color': thumbBorderColor,
  '--podlove-player--progress-bar--ghost-color': ghostColor,
  '--podlove-player--progress-bar--ghost-border-color': ghostBorderColor,
  '--podlove-player--progress-bar--buffer-background-color': bufferBackground
});
</script>
