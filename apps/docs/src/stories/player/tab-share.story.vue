<template>
  <Story title="Player/Tab Share" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="initTab">
      <tab name="share" :style="style">
        <tab-share></tab-share>
      </tab>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="channelColor" title="Channel Color" />
      <HstColor v-model="channelBackground" title="Channel Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { toggleTab } from '@podlove/player-actions/tabs';
import { inlineStyles } from '../helper/styles.js'
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);
const channelColor = ref(config.theme.tokens.brandDark);
const channelBackground = ref(config.theme.tokens.alt);

const style = ref({
  '--podlove-player--tab--color': color,
  '--podlove-player--tab--background': background,
  '--podlove-player--tab-share--channels--color': channelColor,
  '--podlove-player--tab-share--channels--background': channelBackground,
});

const initTab = (store) => {
  store.dispatch(toggleTab('share'));
}

const source = computed(
  () => `<div>
    <tab name="share" :style="${inlineStyles(style)}">
      <tab-share></tab-share>
    </tab>
</div>`
);
</script>
