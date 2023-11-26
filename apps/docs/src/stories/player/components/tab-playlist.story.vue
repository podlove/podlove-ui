<template>
  <Story title="Player/Components/Tab Playlist" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" @init="initTab">
      <root :style="style">
        <tab name="playlist">
          <tab-playlist></tab-playlist>
        </tab>
      </root>
    </podlove-web-player>
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
import '@podlove/player';
import config from '../data/config.json';

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

const initTab = (event) => {
  const store = event.detail;
  store.dispatch(toggleTab('playlist'));
};
</script>
