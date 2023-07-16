<template>
  <div class="podlove-player--poster" data-test="poster">
    <lazy-image
      :url="state.posterSrc"
      :color="state.coverColor"
      alt=""
      @error="actions.errorPosterLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import { mapState, mapActions } from 'redux-vuex';
import { Image as LazyImage } from '@podlove/components';

import select from '../../store/selectors/index.js';

const state = mapState({
  posterSrc: select.header.posterSrc,
  coverColor: select.theme.brandLightest
});

const actions = mapActions('errorPosterLoad');
</script>

<style lang="postcss" scoped>
.podlove-player--poster {
  --podlove-component--image--background: var(--podlove-player--poster--background);
}
</style>
