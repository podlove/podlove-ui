<template>
  <Story title="Player/Step Backward" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root :style="style" class="p-5">
        <step-backward></step-backward>
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
  '--podlove-player--stepper-button--backward--color': color
});

const source = computed(
  () => `<root :style="${inlineStyles(style)}" class="p-5">
  <step-backward></step-backward>
</root>`
);
</script>
