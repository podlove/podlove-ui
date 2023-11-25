<template>
  <Story title="Player/Components/Subscribe Button" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="flex p-5 justify-center">
        <subscribe-button></subscribe-button>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="iconColor" title="Icon Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/player';
import config from '../data/config.json';

const color = ref(config.theme.tokens.brandDark);
const iconColor = ref(config.theme.tokens.brandDark);
const borderColor = ref(config.theme.tokens.brandDark);
const background = ref(config.theme.tokens.alt);

const style = ref({
  '--podlove-player--subscribe-button--icon-color': iconColor,
  '--podlove-player--subscribe-button--color': color,
  '--podlove-player--subscribe-button--border-color': borderColor,
  '--podlove-player--subscribe-button--background': background
});
</script>
