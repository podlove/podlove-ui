<template>
  <Story title="Player/Timer Current" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root :style="style" class="flex justify-center p-10">
        <timer-current></timer-current>
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

const style = computed(() => ({
  '--podlove-player--timer-current--color': color.value
}));

const source = ref(
  `<root :style="${inlineStyles(style)}" class="flex justify-center p-10">
    <timer-current></timer-current>
  </root>`
);
</script>
