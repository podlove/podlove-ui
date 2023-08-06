<template>
  <Story title="Player/Subscribe Button" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root :style="style" class="flex p-5 justify-center">
        <subscribe-button></subscribe-button>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="iconColor" title="Icon Color" />
      <HstColor v-model="borderColor" title="Border Color" />
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

const color = ref(config.theme.tokens.brandDark);
const iconColor = ref(config.theme.tokens.brandDark);
const borderColor = ref(config.theme.tokens.brandDark);
const background = ref(config.theme.tokens.alt);

const style = ref({
  '--podlove-player--subscribe-button--icon-color': iconColor,
  '--podlove-player--subscribe-button--color': color,
  '--podlove-player--subscribe-button--border-color': borderColor,
  '--podlove-player--subscribe-button--background': background
});

const source = computed(
  () => `<root :style="${inlineStyles(style)}" class="flex p-5 justify-center">
    <subscribe-button></subscribe-button>
  </root>`
);
</script>
