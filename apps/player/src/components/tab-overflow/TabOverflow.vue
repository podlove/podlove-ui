<template>
  <div class="absolute w-full bottom-0 inset-x-0 pointer-events-none" data-test="tab-overflow">
    <div class="h-4.mx-4" :style="style" data-test="tab-overflow--shadow"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { fade } from 'farbraum';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const state = mapState({
  color: select.theme.brandDark
});

const style = computed(() => ({
  'background-image': `linear-gradient(${fade(state.color, 1)}, ${state.color})`
}));
</script>
