<template>
  <Story title="Player/Chapter Previous Button" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root class="flex justify-center content-center p-2" :style="style">
        <chapter-previous></chapter-previous>
      </root>
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

const source = computed(
  () => `<root class="flex justify-center content-center p-2" :style="${inlineStyles(style)}">
  <chapter-previous></chapter-previous>
</root>`
);
</script>
