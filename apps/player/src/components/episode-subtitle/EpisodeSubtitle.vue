<template>
  <div class="podlove-player--episode-subtitle block overflow-hidden" data-test="episode-subtitle">
    {{ state.subtitle }}
  </div>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  subtitle: select.episode.subtitle
});

</script>

<style lang="postcss" scoped>
.podlove-player--episode-subtitle {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: var(--podlove-player--episode-subtitle--color);
}
</style>
