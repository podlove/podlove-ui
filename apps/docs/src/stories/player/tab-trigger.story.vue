brandDark
<template>
  <Story title="Player/Tab Trigger" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <root :style="style">
        <tab-trigger tab="shownotes">
          <info-icon />
        </tab-trigger>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="colorActive" title="Color Active" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';
import { toggleTab } from '@podlove/player-actions/tabs';

const color = ref(config.theme.tokens.contrast);
const colorActive = ref(config.theme.tokens.brandDark);

const initTab = (store) => {
  store.dispatch(toggleTab('shownotes'));
};

const style = ref({
  '--podlove-player--tab-trigger--color': color,
  '--podlove-player--tab-trigger--color-active': colorActive,
});


const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <tab-trigger tab="shownotes">
      <info-icon />
    </tab-trigger>
</root>`
);
</script>
