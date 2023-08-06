<template>
  <Story title="Player/Tab Playlist" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <root :style="style">
        <tab name="playlist">
          <tab-playlist></tab-playlist>
        </tab>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="playlistHoverBackground" title="Hover Background" />
      <HstColor v-model="playlistHoverColor" title="Hover Color" />
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
const playlistHoverBackground = ref(config.theme.tokens.brandLightest);
const playlistHoverColor = ref(config.theme.tokens.brandDark);

const style = computed(() => ({
  '--podlove-player--tab--color': color.value,
  '--podlove-player--tab--background': background.value,
  '--podlove-player--tab-playlist--entry--background-hover': playlistHoverBackground.value,
  '--podlove-player--tab-playlist--entry--color-hover': playlistHoverColor.value,
}));

const initTab = (store) => {
  store.dispatch(toggleTab('playlist'));
};

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <tab name="playlist">
      <tab-playlist></tab-playlist>
    </tab>
  </root>`
);
</script>
