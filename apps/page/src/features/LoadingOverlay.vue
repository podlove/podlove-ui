<template>
  <custom-transition type="fade">
    <div class="fixed top-0 left-0 w-screen h-screen z-50 bg-gray-100" v-if="!state.initialized"></div>
  </custom-transition>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { selectors } from '../logic/store';
import CustomTransition from '../components/CustomTransition.vue';

const state = mapState<{ initialized: boolean }>({
  initialized: selectors.colors.initialized
});
</script>
