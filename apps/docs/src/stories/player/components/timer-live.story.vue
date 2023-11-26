<template>
  <Story title="Player/Components/Timer Live" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root :style="style" class="flex justify-center p-10">
        <timer-live></timer-live>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import '@podlove/player';
import config from '../data/config.json';
const color = ref(config.theme.tokens.contrast);

const style = computed(() => ({
  '--podlove-player--timer-live--color': color.value
}));
</script>
