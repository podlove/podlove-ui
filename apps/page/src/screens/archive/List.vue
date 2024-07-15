<template>
  <div class="lg:w-app p-8 overflow-hidden">
    <EpisodeItem
      v-for="(episode, index) in episodes"
      :key="episode"
      :id="episode.toString()"
      :first="index === 0"
      :last="index < episodes.length - 1"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';

import { selectors } from '../../logic';
import EpisodeItem from './Item.vue';

const state = mapState({
  episodes: selectors.view.archive.episodes,
  page: selectors.view.archive.page
});

const items = computed(() => {
  const count = state.page * 25;

  if (count > state.episodes.length) {
    return state.episodes.length;
  }

  return count;
});

const episodes = computed(() => state.episodes.slice(0, items.value).filter(Boolean));
</script>
