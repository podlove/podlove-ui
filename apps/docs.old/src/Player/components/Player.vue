<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ControlsAddon } from '@vitebook/vue/addons';
import '@podlove/player/styles';

import createPlayer from '@podlove/player';
import { init } from '@podlove/player-actions/init';
import Action from '../../shared/Action.vue';

const props = defineProps({
  episode: Object,
  config: Object
});

const player = ref(null);

const { app, store } = createPlayer({ baseUrl: './' });
const size = ref('desktop');

onMounted(() => {
  app.mount(player.value);
  store.dispatch(init(Object.assign({}, props.episode, props.config)));
});
</script>

<template>
  <div>
    <div ref="player" :class="size">
      <slot></slot>
    </div>
    <ControlsAddon>
      <Action label="Size">
        <select v-model="size" class="w-full p-2">
          <option>desktop</option>
          <option>tablet</option>
          <option>mobile</option>
        </select>
      </Action>
    </ControlsAddon>
  </div>
</template>

<style scoped>
.desktop {
  width: 950px;
}

.tablet {
  width: 600px;
}

.mobile {
  width: 300px;
}
</style>
