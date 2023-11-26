<template>
  <Story title="Player/Components/Play Button" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="flex p-2 justify-center items-center" :style="style">
        <play-button></play-button>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="textColor" title="Text Color" />
      <HstColor v-model="textHoverColor" title="Text Hover Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="backgroundHover" title="Background Hover" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/player';

import config from '../data/config.json';

const textColor = ref(config.theme.tokens.brandLightest);
const textHoverColor = ref(config.theme.tokens.brandLightest);
const background = ref(config.theme.tokens.brandDark);
const backgroundHover = ref(config.theme.tokens.brandDarkest);

const style = ref({
  '--podlove-player--play-button--color': textColor,
  '--podlove-player--play-button--color-hover': textHoverColor,
  '--podlove-player--play-button--background': background,
  '--podlove-player--play-button--background-hover': backgroundHover,
});
</script>
