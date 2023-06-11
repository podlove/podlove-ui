<template>
  <li>
    <button @click="click">
      {{ t(state.playText.key, state.playText.attr) }}
    </button>
    <time
      role="timer"
      tabindex="0"
      :aria-label="t(state.timerDuration.key, state.timerDuration.attr)"
    />
  </li>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { selectEpisode } from '@podlove/player-actions/playlist';
import { requestPlay, requestPause } from '@podlove/player-actions/play';
import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps({
  episode: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: null
  }
});

const state = mapState({
  playing: select.driver.playing,
  playText: select.accessibility.episodePlay(props.episode),
  timerDuration: select.accessibility.episodeDuration(props.episode)
});
const dispatch = injectStore().dispatch;

const click = () => {
  if (!props.episode.active) {
    return dispatch(selectEpisode({ index: props.index, play: true }));
  }

  if (state.playing) {
    return dispatch(requestPause());
  }

  return dispatch(requestPlay());
};
</script>
