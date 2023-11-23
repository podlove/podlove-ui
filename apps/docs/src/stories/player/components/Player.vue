<script setup lang="ts">
import { ref, onMounted } from 'vue';

import createPlayer from '@podlove/player';
import { init } from '@podlove/player-actions/init';
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';

const props = defineProps<{
  episode: PodloveWebPlayerEpisode;
  config: PodloveWebPlayerConfig;
}>();

const emits = defineEmits(['init']);

const player = ref(null);

const { app, store } = createPlayer();

onMounted(() => {
  emits('init', store);
  store.dispatch(init({ ...props.episode, ...props.config }));
  app.mount(player.value);
});
</script>

<template>
  <div>
    <div ref="player">
      <slot></slot>
    </div>
  </div>
</template>
