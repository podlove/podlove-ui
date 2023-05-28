<template>
  <div
    class="flex px-2 rounded-sm"
    data-test="tab-chapters--entry"
    :class="{ 'font-medium': chapter.active, 'bg-opacity-25': hover }"
    :style="style"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      aria-hidden="true"
      @click="selectChapter()"
    >
      <icon
        v-if="action.icon"
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
      :progress-color="progressColor"
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
import { mapState, injectStore } from 'redux-vuex';
import { lighten } from 'farbraum';
import { setChapter } from '@podlove/player-actions/chapters';
import { requestPlay, requestPause } from '@podlove/player-actions/play';

import select from '../../../store/selectors/index.js';
import { Icon, ChapterProgress } from '@podlove/components';
import { computed, ref } from 'vue';

const props = defineProps({
  chapter: {
    type: Object,
    default: () => ({})
  }
});

const state = mapState({
  playtime: select.playtime,
  brandLightest: select.theme.brandLightest,
  brandDark: select.theme.brandDark,
  ghost: select.ghost.time,
  current: select.chapters.current,
  playing: select.driver.playing
});

const dispatch = injectStore().dispatch;

const hover = ref(false);
const linkHover = ref(false);

const active = computed(() => props.chapter.active || hover.value);
const progressColor = computed(() => lighten(state.brandDark, 0.1));
const style = computed(() =>
  hover.value
    ? {
        background: state.brandLightest,
        color: state.brandDark
      }
    : {}
);

const action = () => {
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
};

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
