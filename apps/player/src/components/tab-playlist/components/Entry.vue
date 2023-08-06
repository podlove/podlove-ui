<template>
  <div
    class="podlove-player--tab-playlist--entry flex px-2 cursor-pointer rounded-sm"
    :class="{ 'font-medium': episode.active, 'bg-opacity-25': hover, hover }"
    :data-test="`tab-playlist--entry${episode.active ? '--active' : ''}`"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <span
      v-if="episode.active"
      class="w-8 py-2 mr-2 flex justify-center items-center"
      aria-hidden="true"
      data-test="tab-playlist--entry--interaction"
      @click="play()"
    >
      <icon :type="state.playing ? 'menu-pause' : 'menu-play'" :size="24" />
    </span>

    <span
      v-else
      class="w-8 py-2 mr-2 flex justify-center items-center"
      aria-hidden="true"
      data-test="tab-playlist--entry--interaction"
      @click="click({ index, play: true })"
    >
      <menu-play-icon v-if="hover" :size="24" />
      <menu-empty-icon v-else :size="12" />
    </span>

    <span
      class="block w-full py-2 mr-2"
      data-test="tab-playlist--entry--title"
      @click="click({ index, play: true })"
    >
      {{ episode.title }}
    </span>
    <timer
      v-if="episode.duration"
      class="block w-18 py-2"
      :time="episode.duration"
      data-test="tab-playlist--entry--timer"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { selectEpisode } from '@podlove/player-actions/playlist';
import { requestPlay, requestPause } from '@podlove/player-actions/play';
import { Timer, MenuPlayIcon, MenuEmptyIcon } from '@podlove/components';

import select from '../../../store/selectors/index.js';

defineProps({
  index: {
    type: Number,
    default: null
  },
  episode: {
    type: Object,
    default: () => ({})
  }
});

const state = mapState({
  playing: select.driver.playing
});

const dispatch = injectStore().dispatch;

const hover = ref(false);

const mouseOverHandler = () => {
  hover.value = true;
};

const mouseLeaveHandler = () => {
  hover.value = false;
};

const play = () => {
  if (state.playing) {
    dispatch(requestPause());
  } else {
    dispatch(requestPlay());
  }
};

const click = (position) => {
  dispatch(selectEpisode(position));
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-playlist--entry.hover  {
  background: var(--podlove-player--tab-playlist--entry--background-hover);
  color: var(--podlove-player--tab-playlist--entry--color-hover);
}
</style>
