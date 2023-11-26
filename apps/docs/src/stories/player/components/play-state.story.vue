<template>
  <Story title="Player/Components/Play State" auto-props-disabled>
    <podlove-web-player episode="/podcast/episode.json" config="/podcast/config.json">
      <root class="flex justify-center content-center p-2">
        <root class="flex p-2 justify-center items-center">
          <play-state on="initialized">Initialized!</play-state>
          <play-state on="active">Initiaactivelized!</play-state>
          <play-state on="ended">Ended!</play-state>
          <play-state :on="['initialized', 'active', 'ended']">All!</play-state>
        </root>
      </root>
    </podlove-web-player>
  </Story>
</template>

<script lang="ts" setup>
import '@podlove/player';
</script>
