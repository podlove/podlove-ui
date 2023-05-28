<template>
  <h1 :style="style" data-test="episode-title">
    <a
      v-if="state.link"
      class="episode-title block overflow-hidden"
      :href="state.link"
      :target="state.target"
      data-test="episode-title--link"
    >
      {{ state.title }}
    </a>
    <span v-else class="episode-title block overflow-hidden" data-test="episode-title--text">{{
      state.title
    }}</span>
  </h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  font: select.theme.fontBold,
  color: select.theme.contrast,
  title: select.episode.title,
  link: select.episode.link,
  target: select.target
});

const style = computed(() => ({
  color: state.color,
  ...state.font
}));
</script>

<style lang="postcss" scoped>
.episode-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
