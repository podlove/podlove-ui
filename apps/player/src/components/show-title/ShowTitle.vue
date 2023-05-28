<template>
  <h1 :style="style" data-test="show-title">
    <a v-if="state.link" :href="state.link" :target="state.target" data-test="show-title--link">{{
      state.title
    }}</a>
    <span v-else data-test="show-title--text">{{ state.title }}</span>
  </h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  font: select.theme.fontBold,
  color: select.theme.brand,
  title: select.show.title,
  link: select.show.link,
  target: select.target
});

const style = computed(() => ({
  color: state.color,
  ...state.font
}));
</script>
