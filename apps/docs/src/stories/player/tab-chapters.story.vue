<template>
  <Story title="Player/Tab Chapters" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <root :style="style">
        <tab name="chapters">
          <tab-chapters></tab-chapters>
        </tab>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="chaptersHoverBackground" title="Hover Background" />
      <HstColor v-model="chaptersHoverColor" title="Hover Color" />
      <HstColor v-model="chaptersProgressBackground" title="Progress Background" />
      <HstColor v-model="chaptersProgressGhost" title="Ghost Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { fade, lighten } from 'farbraum';
import { toggleTab } from '@podlove/player-actions/tabs';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);
const chaptersHoverBackground = ref(config.theme.tokens.brandLightest);
const chaptersProgressBackground = ref(fade(config.theme.tokens.brandDark, 0.7));
const chaptersProgressGhost = ref(lighten(config.theme.tokens.brandDark, 0.1));
const chaptersHoverColor = ref(config.theme.tokens.brandDark);

const style = computed(() => ({
  '--podlove-player--tab--color': color.value,
  '--podlove-player--tab--background': background.value,
  '--podlove-player--tab-chapters--entry--background-hover': chaptersHoverBackground.value,
  '--podlove-player--tab-chapters--entry--color-hover': chaptersHoverColor.value,
  '--podlove-player--tab-chapters--entry--progress-background': chaptersProgressBackground.value,
  '--podlove-player--tab-chapters--entry--ghost-background': chaptersProgressGhost.value
}));

const initTab = (store) => {
  store.dispatch(toggleTab('chapters'));
};

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <tab name="chapters">
      <tab-chapters></tab-chapters>
    </tab>
  </root>`
);
</script>
