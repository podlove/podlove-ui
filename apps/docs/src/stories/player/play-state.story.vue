<template>
  <Story title="Player/Play State" auto-props-disabled :source="source">
    <player :config="config" :episode="episode">
      <play-state on="initialized">Initialized!</play-state>
      <play-state on="active">Initiaactivelized!</play-state>
      <play-state on="ended">Ended!</play-state>
      <play-state :on="['initialized', 'active', 'ended']">All!</play-state>
    </player>
  </Story>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Player from './components/Player.vue';

import config from './data/config.json';
import episode from './data/episode.json';

const source = computed(
  () => `<div>
    <play-state on="initialized">Initialized!</play-state>
    <play-state on="active">Initiaactivelized!</play-state>
    <play-state on="ended">Ended!</play-state>
    <play-state :on="['initialized', 'active', 'ended']">All!</play-state>
</div>`
);
</script>
