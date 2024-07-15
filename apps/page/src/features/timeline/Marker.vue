<template>
  <div class="flex items-center mb-2 p-2">
    <bullet :top="top" :bottom="bottom">
      <hour-glass-icon :size="16" class="text-gray-100" />
    </bullet>
    <a @click="play" class="block uppercase font-normal cursor-pointer px-2">
      {{ title }}
    </a>
    <div class="text-gray-500 ml-auto font-mono">{{ duration }}</div>
  </div>
</template>

<script lang="ts" setup>
import { toHumanTime } from '@podlove/utils/time';
import { HourGlassIcon } from '@podlove/components';

import Bullet from './Bullet.vue';
import { computed } from 'vue';
import { store, actions } from '../../logic';

const props = defineProps<{
  episodeId: string;
  start: number | null;
  title: string | null;
}>();

const start = computed(() => props.start || 0);

const duration = computed(() => toHumanTime(start.value));

const top = computed(() => start.value > 0);
const bottom = computed(() => start.value === 0);

const play = () => {
  store.dispatch(actions.playEpisode({ id: props.episodeId, playtime: start.value }));
};
</script>
