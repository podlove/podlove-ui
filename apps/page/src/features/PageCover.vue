<template>
  <custom-transition type="fade">
    <div v-if="!state.initialized" class="fixed inset-0 w-screen h-screen page-cover flex items-center justify-center opacity-100">
      <loader :size="100" />
    </div>
  </custom-transition>
</template>

<script lang="ts" setup>
import { mapState } from "redux-vuex";
import { selectors } from "../logic";
import CustomTransition from "../components/CustomTransition.vue";
import Loader from "../components/Loader.vue";

const state = mapState<{ initialized: boolean }>({
  initialized: selectors.colors.initialized
})
</script>

<style scoped>
.page-cover {
  background-color: rgb(99 102 241);
  color: white;
}
</style>
