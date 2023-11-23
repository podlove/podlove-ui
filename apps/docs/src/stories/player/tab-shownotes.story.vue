<template>
  <Story title="Player/Tab Shownotes" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <root :style="style">
        <tab name="shownotes">
          <tab-shownotes></tab-shownotes>
        </tab>
      </root>
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
  store.dispatch(toggleTab('shownotes'));
};

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <tab name="shownotes">
      <tab-shownotes></tab-shownotes>
    </tab>
</root>`
);
</script>
