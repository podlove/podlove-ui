<template>
  <div v-if="state.loading" class="absolute z-10 h-1 w-full">
    <div class="loading-bar h-1" :style="{ width: `${width}%` }"></div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { mapState } from 'redux-vuex';
import { selectors } from '../logic';
import { ref, onUnmounted } from 'vue';

const width = ref(0);

const state = mapState({
  loading: selectors.view.loading
});

let step = 0;
let updateInterval: any;

watch(() => state.loading, (loading) => {
  if (loading) {
    step = 1;
    updateInterval = setInterval(() => {
      step = step + 1;
      width.value = Math.log2(step) * 10;
    }, 250);
  } else {
    step = 0
    width.value = 0;
    clearInterval(updateInterval);
  }
});

onUnmounted(() => {
  clearInterval(updateInterval);
});
</script>

<style scoped>
.loading-bar {
  background-color: rgba(var(--secondary-color-100), 0.8);
  transition: width 0.2s ease-in-out;
}
</style>
