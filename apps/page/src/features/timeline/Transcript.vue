<template>
  <div class="p-2">
    <div class="flex items-center mb-2">
      <bullet :top="true" :bottom="true" :time="start">
        <a v-if="speaker.slug" :href="`/feed/${state.feed}/contributor/${speaker.slug}`">
          <span @mouseover="showPopover" @mouseleave="hidePopover">
            <img v-if="speaker.avatar" :src="speaker.avatar" :width="48" :height="48" />
            <user-icon v-else :size="48" />
          </span>
        </a>
        <span v-else @mouseover="showPopover" @mouseleave="hidePopover">
          <img v-if="speaker.avatar" :src="speaker.avatar" :width="48" :height="48" />
          <user-icon v-else :size="48" />
        </span>
        <popover direction="right">
          <div class="text-sm text-gray-800 p-1 text-center whitespace-nowrap">
            <h3 class="font-bold">{{ speaker.name }}</h3>
          </div>
        </popover>
      </bullet>
      <a class="block uppercase font-normal cursor-pointer px-2">
        {{ speaker.nickname || speaker.name }}
      </a>
      <div class="ml-auto text-gray-500 font-mono">{{ toHumanTime(start) }}</div>
    </div>
    <div class="flex">
      <div class="w-10 mr-4 flex-shrink-0 relative">
        <div class="h-full w-1 border-gray-500 border-l-2 ml-4"></div>
      </div>
      <div class="px-2">
        <span
          :id="transcriptId(text.start, text.end)"
          :class="{
            'border-b-2 border-primary-200': ghostTranscript(text.start, text.end),
            'border-b-2 border-primary-700': activeTranscript(text.start, text.end),
            'ml-0': index === 0
          }"
          class="mr-1 break-words cursor-pointer"
          @click="play(text.start)"
          @mouseover="simulateSection(text.start)"
          @mouseout="disableGhost"
          v-for="(text, index) in texts"
          :key="text.start"
          >{{ text.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { toHumanTime } from '@podlove/utils/time';
import { UserIcon } from '@podlove/components';

import { selectors, actions } from '../../logic';
import Popover from '../../components/Popover.vue';
import Bullet from './Bullet.vue';

const props = defineProps<{
  episodeId: string;
  start: number;
  end: number;
  speaker?: {
    id?: string;
    slug?: string;
    avatar?: string;
    name: string;
    nickname?: string;
  };
  texts: {
    start: number;
    end: number;
    text: string;
  }[];
}>();

const store = injectStore();

const state = mapState({
  ghost: selectors.player.ghost.time,
  hovered: selectors.player.ghost.active,
  current: selectors.current.episode,
  playtime: selectors.player.playtime,
  feed: selectors.podcast.feed,
});

const popoverVisible = ref(false);

const texts = computed(() => props.texts || []);
const active = computed(() => props.episodeId === state.current);
const speaker = computed(
  () => props.speaker || { id: null, slug: null, avatar: '', name: '', nickname: '' }
);

const play = (playtime: number) => {
  store.dispatch(actions.player.playEpisode({ id: props.episodeId, playtime }));
};

const simulateSection = (playtime: number) => {
  if (!active.value) {
    return;
  }

  store.dispatch(actions.enableGhost());
  store.dispatch(actions.simulatePlaytime(playtime));
};

const disableGhost = () => store.dispatch(actions.disableGhost());

const activeTranscript = (start: number, end: number) =>
  active.value && state.playtime >= start && state.playtime < end;

const ghostTranscript = (start: number, end: number) =>
  active.value &&
  !activeTranscript(start, end) &&
  state.hovered &&
  state.ghost >= start &&
  state.ghost < end;

const transcriptId = (start: number, end: number) => {
  if (activeTranscript(start, end)) {
    return 'transcript-active';
  }

  if (ghostTranscript(start, end)) {
    return 'transcript-ghost-active';
  }

  return undefined;
};

const showPopover = () => {
  popoverVisible.value = true;
};

const hidePopover = () => {
  popoverVisible.value = false;
};
</script>
