<template>
  <h1 class="font-bold" data-test="episode-title">
    <a
      v-if="state.link"
      class="podlove-player--episode-title block overflow-hidden"
      :href="state.link"
      :target="state.target"
      data-test="episode-title--link"
    >
      {{ state.title }}
    </a>
    <span v-else class="podlove-player--episode-title block overflow-hidden" data-test="episode-title--text">{{
      state.title
    }}</span>
  </h1>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  title: select.episode.title,
  link: select.episode.link,
  target: select.target
});

</script>

<style lang="postcss" scoped>
.podlove-player--episode-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: var(--podlove-player--episode-title--color);
}
</style>
