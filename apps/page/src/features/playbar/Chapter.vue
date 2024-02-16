<template>
  <div
    class="chapter flex px-2 -mx-2 rounded-sm"
    :class="{ 'font-normal': active }"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
    data-test="tab-chapters--entry"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      @click="selectChapter()"
    >
      <MenuPlayIcon v-if="action.icon === 'play'" />
      <MenuPauseIcon v-if="action.icon === 'pause'" />
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
import { mapState, injectStore } from 'redux-vuex';
import { setChapter } from '@podlove/player-actions/chapters';
import { requestPlay, requestPause } from '@podlove/player-actions/play';
import { ChapterProgress } from '@podlove/components';
import type { PodloveWebPlayerChapter } from '@podlove/types';
import { MenuPlayIcon, MenuPauseIcon } from '@podlove/components';

import { selectors } from '../../logic/store';
import { toInt } from '@podlove/utils/helper';

const props = defineProps<{ chapter: PodloveWebPlayerChapter }>();

const state = mapState({
  playtime: selectors.player.playtime,
  ghost: selectors.player.ghost.time,
  current: selectors.player.chapters.current,
  playing: selectors.player.playing
});

const hover = ref(false);

const store = injectStore();

const active = computed(() => props.chapter.active || hover.value);

const action = computed(() => {
  if (state.current.index === props.chapter.index) {
    return {
      icon: state.playing ? 'pause' : 'play'
    };
  }

  if (hover.value) {
    return {
      icon: 'play'
    };
  }

  return {
    content: (props.chapter.index || 0) + 1
  };
});

const mouseOverHandler = () => {
  hover.value = true;
};

const mouseLeaveHandler = () => {
  hover.value = false;
};

const selectChapter = () => {
  if (state.current.index === props.chapter.index) {
    store.dispatch(state.playing ? requestPause() : requestPlay());
    return false;
  }

  store.dispatch(setChapter(toInt(props.chapter.index)));
  store.dispatch(requestPlay());
  return false;
};
</script>

<style>
.chapter {
  --podlove-component--chapter-progress--background: rgba(var(--complementary-color-100), 0.8);
  --podlove-component--chapter-progress--ghost--background: rgba(var(--complementary-color-100), 0.5);
}

.chapter-progress {
  overflow: hidden;
}

.chapter-progress .title {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
