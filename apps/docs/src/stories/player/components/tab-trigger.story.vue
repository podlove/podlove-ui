brandDark
<template>
  <Story title="Player/Components/Tab Trigger" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" @init="initTab">
      <root :style="style">
        <tab-trigger tab="shownotes">
          <info-icon />
        </tab-trigger>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="colorActive" title="Color Active" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toggleTab } from '@podlove/player-actions/tabs';
import '@podlove/player';
import config from '../data/config.json';

const color = ref(config.theme.tokens.contrast);
const colorActive = ref(config.theme.tokens.brandDark);

const initTab = (event) => {
  const store = event.detail.player.store;
  store.dispatch(toggleTab('shownotes'));
};

const style = ref({
  '--podlove-player--tab-trigger--color': color,
  '--podlove-player--tab-trigger--color-active': colorActive,
});
</script>
