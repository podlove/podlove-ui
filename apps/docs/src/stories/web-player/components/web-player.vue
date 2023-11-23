<template>
  <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json"
    ><slot></slot
  ></podlove-web-player>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '@podlove/web-player';


// const player = ref(null);

// onMounted(async () => {
//   if (!player.value) {
//     return;
//   }

//   const app = await createApp('/podcast/episode.json', '/podcast/config.json');

//   if (!app) {
//     return;
//   }

//   app.mount(player.value);
// });
</script>
<style lang="postcss"></style>
