<template>
  <Story title="Player/Next Chapter"  auto-props-disabled>
    <player :config="config" :episode="episode">
      <chapter-next class="mx-2 block"></chapter-next>
    </player>
    <template #controls>
      <theme-control v-model="config.theme"></theme-control>
    </template>
  </Story>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import ThemeControl from './components/ThemeControl.vue';
import Player from './components/Player.vue';
import defaultConfig from './data/config.json';
import episode from './data/episode.json';

const config = reactive(defaultConfig);

</script>
