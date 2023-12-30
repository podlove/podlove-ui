<template>
  <play-button
    class="play-button"
    :size="size"
    @click="play"
    :type="state.playing ? 'pause' : 'play'"
  />
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { requestPause, requestPlay } from '@podlove/player-actions/play';
import { PlayButton } from '@podlove/components';
import { selectors, actions } from '../logic';

const props = defineProps<{ id: string; size: number }>();

const state = mapState({
  playing: selectors.episode.playing(props.id)
});

const play = ({ type }: { type: string }) => {
  switch (type) {
    case requestPlay.toString():
      actions.playEpisode({ id: props.id });
      break;
    case requestPause.toString():
      actions.pauseEpisode();
      break;
  }
};
</script>

<style scoped>
.play-button {
  --podlove-component--play-button--text-color: var(--primary-color-200);
  --podlove-component--play-button--background: var(--primary-color-800);
}
</style>
