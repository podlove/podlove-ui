<template>
  <Story title="Player/Error" auto-props-disabled :source="source">
    <player :config="config" :episode="episode" @init="emulateError">
      <root :style="style">
        <error></error>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="titleColor" title="Title Text" />
      <HstColor v-model="messageColor" title="Message Color" />
      <HstColor v-model="buttonTextColor" title="Retry Button Text" />
      <HstColor v-model="buttonBackgroundColor" title="Retry Button Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { showError } from '@podlove/player-actions/error';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const background = ref(config.theme.tokens.brandLightest);
const titleColor = ref(config.theme.tokens.contrast);
const messageColor = ref(config.theme.tokens.contrast);
const buttonTextColor = ref(config.theme.tokens.alt);
const buttonBackgroundColor = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--error--background': background,
  '--podlove-player--error--title-color': titleColor,
  '--podlove-player--error--message-color': messageColor,
  '--podlove-player--error--retry-button-color': buttonTextColor,
  '--podlove-player--error--retry-button-background': buttonBackgroundColor
});

const emulateError = (store) => {
  store.dispatch(
    showError({
      title: 'Error Title',
      message:
        'This is the error message, it should contain some details about the origin and how it could be solved',
      retry: true
    })
  );
};

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
  <error></error>
</root>`
);
</script>
