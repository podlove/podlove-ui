<template>
  <Story title="Web Player/Templates" auto-props-disabled>
    <Variant title="XL">
      <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" variant="xl"></podlove-web-player>
    </Variant>
    <Variant title="L">
      <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" variant="l"></podlove-web-player>
    </Variant>
    <Variant title="M">
      <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json" variant="m"></podlove-web-player>
    </Variant>
    <Variant title="Custom">
      <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
        <root style="max-width: 950px; min-width: 260px" class="p-4 flex justify-center rounded">
          <play-button></play-button>
        </root>
      </podlove-web-player>
    </Variant>

  </Story>
</template>
<script setup lang="ts">
import '@podlove/web-player';
</script>
<style lang="postcss"></style>
