<template>
  <Story title="Player/Components/Divider" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="p-4" :style="style">
        <divider class="w-full"></divider>
      </root>
    </podlove-web-player>
    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '@podlove/player';
import config from '../data/config.json';

const color = ref(config.theme.tokens.brandDark);

const style = ref({
  '--podlove-player--divider--color': color
});

</script>
