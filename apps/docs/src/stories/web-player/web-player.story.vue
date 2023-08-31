<template>
  <Story title="Web Player/Templates" auto-props-disabled>
    <Variant title="XL" :source="source('xl')">
      <web-player variant="xl" />
    </Variant>
    <Variant title="L" :source="source('l')">
      <web-player variant="l" />
    </Variant>
    <Variant title="M" :source="source('m')">
      <web-player variant="m" />
    </Variant>
    <Variant title="Custom" :source="customTemplate">
      <web-player>
        <root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center rounded">
          <play-button></play-button>
        </root>
      </web-player>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import WebPlayer from './components/web-player.vue';

const source = (variant: string) => `
  <div id="player" data-variant="${variant}"></div>
  <\script async type="module">
    import { createApp } from '@podlove/web-player';
    const { player, subscribeButton, mount } = await createApp('/path/to/episode.json', '/path/to/config.json');

    await mount('#player');
  </\script>
`;

const customTemplate = `
  <div id="player">
    <root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center rounded">
      <play-button></play-button>
    </root>
  </div>
  <\script async type="module">
    import { createApp } from '@podlove/web-player';
    const { player, subscribeButton, mount } = await createApp('/path/to/episode.json', '/path/to/config.json');

    await mount('#player');
  </\script>
`

</script>
<style lang="postcss"></style>
