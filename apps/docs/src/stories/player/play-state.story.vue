<template>
  <Story title="Player/Play State" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <root class="flex p-2 justify-center items-center">
        <play-state on="initialized">Initialized!</play-state>
        <play-state on="active">Initiaactivelized!</play-state>
        <play-state on="ended">Ended!</play-state>
        <play-state :on="['initialized', 'active', 'ended']">All!</play-state>
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
    <play-state on="initialized">Initialized!</play-state>
    <play-state on="active">Initiaactivelized!</play-state>
    <play-state on="ended">Ended!</play-state>
    <play-state :on="['initialized', 'active', 'ended']">All!</play-state>
</root>`
);
</script>
