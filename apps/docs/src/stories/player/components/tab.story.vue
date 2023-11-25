<template>
  <Story title="Player/Components/Tab" auto-props-disabled>
    <podlove-web-player
      episode="/podcast/episode.json"
      config="/podcast/config.json"
      @init="initTab"
    >
      <root :style="style">
        <tab name="chapters"><div class="p-5">My Tab Content</div></tab>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toggleTab } from '@podlove/player-actions/tabs';
import '@podlove/player';
import config from '../data/config.json';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--tab--color': color,
  '--podlove-player--tab--background': background
});

const initTab = (event) => {
  const store = event.detail.player.store;
  store.dispatch(toggleTab('chapters'));
};
</script>
