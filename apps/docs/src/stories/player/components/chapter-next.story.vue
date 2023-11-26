<template>
  <Story title="Player/Components/Chapter Next Button" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="flex justify-center content-center p-2" :style="style">
        <chapter-next></chapter-next>
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
  '--podlove-player--chapter-next--color': color.value
});

</script>
