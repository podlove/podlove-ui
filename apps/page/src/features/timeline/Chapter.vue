<template>
  <div class="flex items-center mb-2 px-2" @mouseover="simulateChapter" @mouseout="disableChapter">
    <bullet :top="true" :bottom="true" :time="start"><chapter-icon :size="25" /></bullet>
    <div
      class="flex items-center space-between p-2 -mx-2 rounded w-full overflow-hidden"
      :class="{
        'bg-primary-300': ghostChapter,
        'bg-primary-700 text-gray-100': activeChapter
      }"
    >
      <a
        @click="play"
        class="block uppercase font-normal cursor-pointer px-2 py-1 rounded truncate w-full"
        v-html="title"
      >
      </a>
      <div
        class="font-mono"
        :class="{ 'text-gray-100': activeChapter, 'text-gray-500': !activeChapter }"
      >
        {{ toHumanTime(start) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { toHumanTime } from '@podlove/utils/time';
import { enableGhost, disableGhost } from '@podlove/player-actions/progress';
import { simulatePlaytime } from '@podlove/player-actions/timepiece';
import { ChapterIcon } from '@podlove/components';
import { mapState } from 'redux-vuex';

import { selectors, actions } from '../../logic';

import Bullet from './Bullet.vue';

const props = defineProps<{
  episodeId: string;
  start: number | null;
  end: number | null;
  title: string | null;
}>();

const state = mapState({
  ghost: selectors.player.ghost.time,
  hovered: selectors.player.ghost.active,
  current: selectors.current.episode,
  playtime: selectors.player.playtime
});

const title = computed(() => props.title || '');
const start = computed(() => props.start || 0);
const end = computed(() => props.end || 0);

const activeEpisode = computed(() => state.current === props.episodeId);
const activeChapter = computed(
  () => activeEpisode.value && state.playtime >= start.value && state.playtime < end.value
);
const ghostChapter = computed(
  () =>
    activeEpisode.value &&
    !activeChapter.value &&
    state.hovered &&
    state.ghost >= start.value &&
    state.ghost < end.value
);

const play = () => {
  actions.playEpisode({ id: props.episodeId, playtime: start.value });
};

const simulateChapter = () => {
  if (!activeEpisode) {
    return;
  }

  enableGhost();
  simulatePlaytime(start.value > 0 ? start.value + 1 : 0);
};

const disableChapter = () => {
  disableGhost();
};
</script>
