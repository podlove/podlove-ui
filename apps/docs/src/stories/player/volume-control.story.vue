<template>
  <Story title="Player/Volume Control" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root :style="style" class="flex justify-center p-10">
        <volume-control :placement="placement"></volume-control>
      </root>
    </player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="iconColor" title="Icon Color" />
      <HstColor v-model="progressColor" title="Progress Color" />
      <HstColor v-model="thumbColor" title="Thumb Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstSelect v-model="placement" :options="['right', 'left']" title="Placement" />

    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { fade } from 'farbraum';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';
import { inlineStyles } from '../helper/styles.js';

const color = ref(config.theme.tokens.brandDark);
const background = ref(config.theme.tokens.brandLightest);
const iconColor = ref(config.theme.tokens.brandDark);
const progressColor = ref(fade(config.theme.tokens.brandDark, 0.7));
const thumbColor = ref(config.theme.tokens.brandDark);
const borderColor = ref(config.theme.tokens.brandDark);

const placement = ref('left')

const style = ref({
  '--podlove-player--volume-control--color': color.value,
  '--podlove-player--volume-control--background': background.value,
  '--podlove-player--volume-control--icon-color': iconColor.value,
  '--podlove-player--volume-control--progress-color': progressColor.value,
  '--podlove-player--volume-control--thumb-color': thumbColor.value,
  '--podlove-player--volume-control--border-color': borderColor.value,
});

const source = computed(
  () => `<root :style="${inlineStyles(style)}">
    <volume-control :placement="${placement.value}"></volume-control>
  </root>`
);
</script>
