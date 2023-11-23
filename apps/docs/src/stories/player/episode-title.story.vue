<template>
  <Story title="Player/Episode Title" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root class="p-2" :style="style">
        <episode-title></episode-title>
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

const color = ref(config.theme.tokens.contrast);

const style = ref({
  '--podlove-player--episode-title--color': color
});

const source = computed(
  () => `<root class="p-2" :style="${inlineStyles(style)}">
  <episode-title></episode-title>
</root>`
);
</script>
