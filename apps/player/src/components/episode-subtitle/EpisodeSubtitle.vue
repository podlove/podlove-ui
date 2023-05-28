<template>
  <div class="episode-subtitle block overflow-hidden" :style="style" data-test="episode-subtitle">
    {{ state.subtitle }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  font: select.theme.fontRegular,
  color: select.theme.contrast,
  subtitle: select.episode.subtitle
});

const style = computed(() => ({
  color: state.color,
  ...state.font
}));
</script>

<style lang="postcss" scoped>
.episode-subtitle {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
