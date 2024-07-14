<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen z-50 bg-gray-100 loading-overlay"
    :class="{ done, hidden }"
  ></div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { mapState } from 'redux-vuex';
import { selectors } from '../logic/store';

const hidden = ref(false);

const state = mapState<{ initialized: boolean }>({
  initialized: selectors.colors.initialized
});

const done = computed(() => state.initialized);

watch(done, () => {
  setTimeout(() => {
    hidden.value = true;
  }, 250);
});
</script>

<style scoped>
.loading-overlay {
  opacity: 1;
  transition: opacity 250ms;
}

.loading-overlay.done {
  opacity: 0;
}
</style>
