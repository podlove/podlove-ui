<template>
  <h1 class="podlove-player--show-title font-bold" data-test="show-title">
    <a v-if="state.link" :href="state.link" :target="state.target" data-test="show-title--link">{{
      state.title
    }}</a>
    <span v-else data-test="show-title--text">{{ state.title }}</span>
  </h1>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  title: select.show.title,
  link: select.show.link,
  target: select.target
});
</script>

<style lang="postcss" scoped>
.podlove-player--show-title {
  color: var(--podlove-player--show-title--color);
}
</style>
