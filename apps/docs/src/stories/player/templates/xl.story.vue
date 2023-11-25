<template>
  <Story title="Player/Templates/XL" auto-props-disabled>
    <podlove-web-player
      episode="/podcast/episode.json"
      config="/podcast/config.json"
      variant="xl"
    ></podlove-web-player>
  </Story>
</template>
<script setup lang="ts">
import '@podlove/player';
</script>
