<template>
  <Story title="Player/Tab Share" auto-props-disabled :source="source" :layout="{ type: 'single', iframe: false }">
    <player :config="config" :episode="episode" @init="initTab">
      <root :style="style">
      <tab name="share">
        <tab-share></tab-share>
      </tab>
    </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="channelColor" title="Channel Color" />
      <HstColor v-model="channelBackground" title="Channel Background" />
      <HstColor v-model="embedInputColor" title="Embed Input Color" />
      <HstColor v-model="embedInputBackground" title="Embed Input Background" />
      <HstColor v-model="embedInputBorder" title="Embed Input Border" />
      <HstColor v-model="embedButtonColor" title="Embed Button Color" />
      <HstColor v-model="embedButtonBackground" title="Embed Button Background" />
      <HstColor v-model="embedButtonBorder" title="Embed Button Border" />
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
const embedInputColor = ref(config.theme.tokens.contrast);
const embedInputBackground = ref(config.theme.tokens.alt);
const embedInputBorder = ref(config.theme.tokens.brandDark);
const embedButtonColor = ref(config.theme.tokens.brandDark);
const embedButtonBackground = ref(config.theme.tokens.alt);
const embedButtonBorder = ref(config.theme.tokens.brandDark);
const sharePlaytimeColor = ref(config.theme.tokens.brandDark);
const sharePlaytimeBorderColor = ref(config.theme.tokens.brandDark);
const sharePlaytimeBackground = ref(config.theme.tokens.alt);

const style = ref({
  '--podlove-player--tab--color': color,
  '--podlove-player--tab--background': background,
  '--podlove-player--tab-share--channels--color': channelColor,
  '--podlove-player--tab-share--channels--background': channelBackground,
  '--podlove-player--tab-share--embed--input--color': embedInputColor,
  '--podlove-player--tab-share--embed--input--background': embedInputBackground,
  '--podlove-player--tab-share--embed--input--border': embedInputBorder,
  '--podlove-player--tab-share--embed--button--color': embedButtonColor,
  '--podlove-player--tab-share--embed--button--background': embedButtonBackground,
  '--podlove-player--tab-share--embed--button--border': embedButtonBorder,
  '--podlove-player--tab-share--share-playtime--color': sharePlaytimeColor,
  '--podlove-player--tab-share--share-playtime--border': sharePlaytimeBorderColor,
  '--podlove-player--tab-share--share-playtime--background': sharePlaytimeBackground,
});

const initTab = (store) => {
  store.dispatch(toggleTab('share'));
}

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <tab name="share">
      <tab-share></tab-share>
    </tab>
</root>`
);
</script>
