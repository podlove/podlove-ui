<template>
  <Story title="Player/Components/Tab Transcripts" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" @init="initTab">
      <root :style="style">
        <tab name="transcripts">
          <tab-transcripts></tab-transcripts>
        </tab>
      </root>
    </podlove-web-player>

    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="searchInputColor" title="Search Input Color" />
      <HstColor v-model="searchBackgroundColor" title="Search Background Color" />
      <HstColor v-model="searchButtonColor" title="Search Button Color" />
      <HstColor v-model="searchIconColor" title="Search Icon Color" />
      <HstColor v-model="searchButtonColorActive" title="Search Button Color Active" />
      <HstColor v-model="searchButtonBackground" title="Search Button Background" />
      <HstColor v-model="searchButtonBackgroundActive" title="Search Button Background Active" />
      <HstColor v-model="transcriptsEntryBackgroundActive" title="Entry Background Active" />
      <HstColor v-model="transcriptsEntryBackgroundHighlight" title="Entry Background Highlight" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { toggleTab } from '@podlove/player-actions/tabs';
import { fade } from 'farbraum';
import '@podlove/player';
import config from '../data/config.json';

const color = ref(config.theme.tokens.alt);
const background = ref(config.theme.tokens.brandDark);
const searchInputColor = ref(config.theme.tokens.contrast);
const searchBackgroundColor = ref(config.theme.tokens.brandLightest);
const searchButtonColor = ref(config.theme.tokens.brandLightest);
const searchIconColor = ref(config.theme.tokens.brandDark);
const searchButtonColorActive = ref(config.theme.tokens.contrast);
const searchButtonBackground = ref(config.theme.tokens.brandDark);
const searchButtonBackgroundActive = ref(config.theme.tokens.brandLightest);
const transcriptsEntryBackgroundActive = ref(fade(config.theme.tokens.alt, 0.8));
const transcriptsEntryBackgroundHighlight = ref(config.theme.tokens.shadeDark);

const style = computed(() => ({
  '--podlove-player--tab--color': color.value,
  '--podlove-player--tab--background': background.value,
  '--podlove-player--tab-transcripts--search-input--color': searchInputColor.value,
  '--podlove-player--tab-transcripts--search-input--background': searchBackgroundColor.value,
  '--podlove-player--tab-transcripts--search-button--color': searchButtonColor.value,
  '--podlove-player--tab-transcripts--search-button--color-active': searchButtonColorActive.value,
  '--podlove-player--tab-transcripts--search-button--background': searchButtonBackground.value,
  '--podlove-player--tab-transcripts--search-button--background-active': searchButtonBackgroundActive.value,
  '--podlove-player--tab-transcripts--entry--background-active': transcriptsEntryBackgroundActive.value,
  '--podlove-player--tab-transcripts--entry--background-highlight': transcriptsEntryBackgroundHighlight.value,
  '--podlove-player--tab-transcripts--search-icon--color': searchIconColor.value,
}));

const initTab = (event) => {
  const store = event.detail;
  store.dispatch(toggleTab('transcripts'));
};
</script>
