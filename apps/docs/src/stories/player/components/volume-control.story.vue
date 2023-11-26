<template>
  <Story title="Player/Components/Volume Control" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="flex justify-center p-10">
        <volume-control :placement="placement"></volume-control>
      </root>
    </podlove-web-player>
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
import { ref } from 'vue';
import { fade } from 'farbraum';
import '@podlove/player';
import config from '../data/config.json';

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
</script>
