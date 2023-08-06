<template>
  <div
    class="podlove-player--tab-chapters--entry flex px-2 rounded-sm"
    data-test="tab-chapters--entry"
    :class="{ 'font-medium': chapter.active, 'bg-opacity-25': hover, hover }"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      aria-hidden="true"
      @click="selectChapter($event)"
    >
      <link-icon
        v-if="action.icon === 'link-icon'"
        :size="24"
        :data-test="`tab-chapters--trigger--${action.icon}`"
      />
      <menu-pause-icon
        v-if="action.icon === 'menu-pause'"
        :type="action.icon"
        :size="24"
        :data-test="`tab-chapters--trigger--${action.icon}`"
      />
      <menu-play-icon
        v-if="action.icon === 'menu-play'"
        :type="action.icon"
        :size="24"
        :data-test="`tab-chapters--trigger--${action.icon}`"
      />
      <span v-else data-test="tab-chapters--index">{{ action.content }}</span>
    </span>
    <chapter-progress
      class="w-full"
      :chapter="chapter"
      :show-link="true"
      :playtime="state.playtime"
      :ghost="state.ghost"
      @chapter="dispatch"
      @play="dispatch"
      @ghost="dispatch"
      @simulate="dispatch"
      @playtime="dispatch"
      @hover="linkMouseover"
    />
  </div>
</template>

<script lang="ts" setup>
import { LinkIcon, MenuPauseIcon, MenuPlayIcon, ChapterProgress } from '@podlove/components';
import { mapState, injectStore } from 'redux-vuex';
import { setChapter } from '@podlove/player-actions/chapters';
import { requestPlay, requestPause } from '@podlove/player-actions/play';

import select from '../../../store/selectors/index.js';
import { computed, ref } from 'vue';

const props = defineProps({
  chapter: {
    type: Object,
    default: () => ({})
  }
});

const state = mapState({
  playtime: select.playtime,
  ghost: select.ghost.time,
  current: select.chapters.current,
  playing: select.driver.playing
});

const dispatch = injectStore().dispatch;

const hover = ref(false);
const linkHover = ref(false);

const action = computed((): { icon?: string; content?: string } => {
  if (linkHover.value) {
    return {
      icon: 'link'
    };
  }

  if (state.current.index === props.chapter.index) {
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
    content: props.chapter.index
  };
});

const mouseOverHandler = () => {
  hover.value = true;
};

const mouseLeaveHandler = () => {
  hover.value = false;
};

const linkMouseover = (state: any) => {
  linkHover.value = !!state;
};

const selectChapter = (event: MouseEvent) => {
  if (linkHover.value) {
    return false;
  }

  if (state.current.index === props.chapter.index) {
    dispatch(state.playing ? requestPause() : requestPlay());
    return false;
  }

  dispatch(setChapter(props.chapter.index - 1));
  dispatch(requestPlay());
  event && event.preventDefault();
  return false;
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-chapters--entry {
  --podlove-component--chapter-progress--background: var(--podlove-player--tab-chapters--entry--progress-background);
  --podlove-component--chapter-ghost--background: var(--podlove-player--tab-chapters--entry--ghost-background);
}

.podlove-player--tab-chapters--entry.hover  {
  background: var(--podlove-player--tab-chapters--entry--background-hover);
  color: var(--podlove-player--tab-chapters--entry--color-hover);
}
</style>
