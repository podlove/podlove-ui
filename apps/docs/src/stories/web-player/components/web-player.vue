<template>
  <div ref="player" :data-variant="$props.variant"><slot></slot></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import createApp from '@podlove/web-player';

defineProps<{ variant?: 'xl' | 'l' | 'm' }>();

const player = ref(null);

onMounted(async () => {
  if (!player.value) {
    return;
  }

  const app = await createApp('/podcast/episode.json', '/podcast/config.json');

  if (!app) {
    return;
  }

  app.mount(player.value);
});
</script>
<style lang="postcss"></style>
