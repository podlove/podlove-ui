<template>
  <Story title="Player/Divider" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root class="p-4" :style="style">
        <divider class="w-full"></divider>
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
  '--podlove-player--divider--color': color
});

const source = computed(
  () => `<root class="p-4" :style="${inlineStyles(style)}">
  <divider class="w-full"></divider>
</root>`
);
</script>
