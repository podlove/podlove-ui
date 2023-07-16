<template>
  <Story title="Player/Tab" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" :style="style" @init="initTab">
      <tab name="chapters">My Tab Content</tab>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { toggleTab } from '@podlove/player-actions/tabs';
import { inlineStyles } from '../helper/styles.js';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--tab--color': color,
  '--podlove-player--tab--background': background
});

const initTab = (store) => {
  store.dispatch(toggleTab('chapters'));
}

const source = computed(
  () => `<div :style="${inlineStyles(style)}">
    <tab name="chapters">My Tab Content</tab>
</div>`
);
</script>
