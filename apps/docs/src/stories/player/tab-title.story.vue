<template>
  <Story title="Player/Tab Title" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root>
        <tab-title class="p-5">Tab Title Content</tab-title>
      </root>
    </player>
  </Story>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';

const source = computed(
  () => `<root>
  <tab-title class="p-5"></tab-title>
</root>`
);
</script>
