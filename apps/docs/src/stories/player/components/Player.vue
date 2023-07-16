<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@podlove/player/styles';

import createPlayer from '@podlove/player';
import { init } from '@podlove/player-actions/init';

const props = defineProps({
  episode: Object,
  config: Object
});

const emits = defineEmits(['init']);

const player = ref(null);

const { app, store } = createPlayer({ baseUrl: './' });

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
