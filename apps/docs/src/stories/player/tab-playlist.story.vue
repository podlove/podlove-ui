<template>
  <Story title="Player/Tab Playlist" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <tab name="playlist" :style="style">
        <tab-playlist></tab-playlist>
      </tab>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { toggleTab } from '@podlove/player-actions/tabs';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);

const style = computed(() => ({
  '--podlove-player--tab--color': color.value,
  '--podlove-player--tab--background': background.value
}));

const initTab = (store) => {
  store.dispatch(toggleTab('playlist'));
}

const source = computed(
  () => `<div>
    <tab name="playlist" :style="${inlineStyles(style)}">
      <tab-playlist></tab-playlist>
    </tab>
</div>`
);
</script>
