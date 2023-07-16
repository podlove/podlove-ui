<template>
  <Story title="Player/Play Button" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style">
      <play-button></play-button>
    </player>
    <template #controls>
      <HstColor v-model="textColor" title="Text Color" />
      <HstColor v-model="textHoverColor" title="Text Hover Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const textColor = ref(config.theme.tokens.brandDark);
const textHoverColor = ref(config.theme.tokens.brandDarkest);
const background = ref(config.theme.tokens.brandLightest);

const style = ref({
  '--podlove-player--play-button--color': textColor,
  '--podlove-player--play-button--color-hover': textHoverColor,
  '--podlove-player--play-button--background': background,
});

const source = computed(
  () => `<div :style="${inlineStyles(style)}">
  <play-button></play-button>
</div>`
);
</script>
