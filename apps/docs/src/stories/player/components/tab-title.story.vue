<template>
  <Story title="Player/Components/Tab Title" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root>
        <tab-title class="p-5">Tab Title Content</tab-title>
      </root>
    </podlove-web-player>
  </Story>
</template>

<script lang="ts" setup>
import '@podlove/player';
</script>
