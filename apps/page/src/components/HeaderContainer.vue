<template>
  <header
    class="w-full px-8 pt-20 pb-32 bg-primary-900 flex items-center justify-center relative shadow"
    :style="style"
  >
    <slot></slot>
  </header>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { computed } from 'vue';
import { selectors } from '../logic';

const state = mapState({
  background: selectors.theme.background
});

const style = computed(() => {
  if (!state.background) {
    return {};
  }

  return {
    'background-image': `url(${state.background})`
  };
});
</script>
