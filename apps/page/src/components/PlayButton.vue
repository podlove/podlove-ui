<template>
  <play-button
    class="play-button"
    :size="size"
    @play="play"
    @pause="pause"
    :type="state.playing ? 'pause' : 'play'"
  />
</template>

<script setup lang="ts">
import { mapState, injectStore } from 'redux-vuex';
import { PlayButton } from '@podlove/components';
import { selectors, actions } from '../logic';

const props = defineProps<{ id: string; size: number }>();

const store = injectStore();

const state = mapState({
  playing: selectors.episode.playing(props.id)
});

const play = () => {
  store.dispatch(actions.player.playEpisode({ id: props.id }))
}

const pause = () => {
  store.dispatch(actions.player.pauseEpisode())
}
</script>

<style scoped>
.play-button {
  --podlove-component--play-button--text-color: rgb(var(--primary-color-200));
  --podlove-component--play-button--background: rgb(var(--primary-color-800));
}
</style>
