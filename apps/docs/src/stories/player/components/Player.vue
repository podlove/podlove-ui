<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@podlove/player/styles';

import createPlayer from '@podlove/player';
import { init } from '@podlove/player-actions/init';

const props = defineProps({
  episode: Object,
  config: Object
});

const player = ref(null);

const { app, store } = createPlayer({ baseUrl: './' });

onMounted(() => {
  app.mount(player.value);
  store.dispatch(init(Object.assign({}, props.episode, props.config)));
});
</script>

<template>
  <div>
    <div ref="player">
      <slot></slot>
    </div>
  </div>
</template>
