<template>
  <Story title="Player/Templates/M" auto-props-disabled>
    <podlove-web-player
      episode="/podcast/episode.json"
      config="/podcast/config.json"
      variant="m"
    ></podlove-web-player>
  </Story>
</template>
<script setup lang="ts">
import '@podlove/player';
</script>
