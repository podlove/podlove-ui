<script lang="ts" setup>
import { ref } from 'vue';
import { logEvent } from 'histoire/client';
import { PlayButton } from '@podlove/components';
import { sandyBrown, charcoal } from '../colors.js'

const type = ref('play');
const background = ref(sandyBrown);
const color = ref(charcoal);
const label = ref('My Label');
const size = ref(50);

const style = ref({
  '--podlove-component-play-button-background': background,
  '--podlove-component-play-button-text-color': color
});
</script>

<template>
  <Story title="Components/Play Button" auto-props-disabled>
    <play-button
      :type="type"
      :label="label"
      :size="size"
      @play="logEvent('play', $event)"
      @pause="logEvent('pause', $event)"
      @restart="logEvent('restart', $event)"
      :style="style"
    >
    </play-button>

    <template #controls>
      <HstSelect
        v-model="type"
        title="Type"
        :options="['play', 'pause', 'loading', 'restart']"
      />
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background Color" />
      <HstText v-model="label" title="Label" />
      <HstNumber v-model="size" title="Size" />
    </template>
  </Story>
</template>
