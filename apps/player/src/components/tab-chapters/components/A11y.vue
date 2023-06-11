<template>
  <li>
    <button @click="selectChapter">
      {{ t(state.buttonText.key, state.buttonText.attr) }}
    </button>
    <time
      role="timer"
      tabindex="0"
      :title="t(state.timerRemaining.key, state.timerRemaining.attr)"
    />
  </li>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { setChapter } from '@podlove/player-actions/chapters';
import { requestPlay, requestPause } from '@podlove/player-actions/play';
import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps({
  chapter: {
    type: Object,
    default: () => ({})
  }
});

const state = mapState({
  buttonText: select.accessibility.chapterPlay(props.chapter),
  timerRemaining: select.accessibility.chapterTimerRemaining(props.chapter),
  current: select.chapters.current,
  playtime: select.playtime,
  playing: select.driver.playing
});
const dispatch = injectStore().dispatch;

const selectChapter = () => {
  if (state.current.index === props.chapter.index) {
    dispatch(state.playing ? requestPause() : requestPlay());
  } else {
    dispatch(setChapter(props.chapter.index - 1));
    dispatch(requestPlay());
  }
};
</script>
