<template>
  <div
    class="flex px-2 -mx-2 rounded-sm"
    :class="{ 'font-normal': active }"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
    data-test="tab-chapters--entry"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      @click="selectChapter()"
    >
      <icon v-if="action.icon" :type="action.icon" :size="24" />
      <span v-else>{{ action.content }}</span>
    </span>

    <chapter-progress
      class="w-full whitespace-nowrap"
      :chapter="chapter"
      :playtime="state.playtime"
      :ghost="state.ghost"
      @chapter="store.dispatch"
      @play="store.dispatch"
      @ghost="store.dispatch"
      @simulate="store.dispatch"
      @playtime="store.dispatch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { setChapter } from '@podlove/player-actions/chapters';
import { requestPlay, requestPause } from '@podlove/player-actions/play';
import { mapState, injectStore } from 'redux-vuex';

import { selectors } from '../../logic/store';
import type { PodloveWebPlayerChapter } from '@podlove/types';

const props = defineProps<{ chapter: PodloveWebPlayerChapter }>();

const state = mapState({
  playtime: selectors.player.playtime,
  ghost: selectors.player.ghost.time,
  current: selectors.player.chapters.current,
  playing: selectors.player.playing,
  test: selectors.player.chapters.list
});


console.log('TEST' , state.test);
const hover = ref(false);

const store = injectStore();

const active = computed(() => props.chapter.active || hover.value);

const action = computed(() => {
  if (state.current.index === state.chapter.index) {
    return {
      icon: state.playing ? 'menu-pause' : 'menu-play'
    };
  }

  if (hover.value) {
    return {
      icon: 'menu-play'
    };
  }

  return {
    content: state.chapter.index
  };
});

const mouseOverHandler = () => {
  hover.value = true;
};

const mouseLeaveHandler = () => {
  hover.value = false;
};

const selectChapter = () => {
  if (state.current.index === state.chapter.index) {
    store.dispatch(state.playing ? requestPause() : requestPlay());
    return false;
  }

  store.dispatch(setChapter((props.chapter.index || 1) - 1));
  store.dispatch(requestPlay());
  return false;
};
</script>
