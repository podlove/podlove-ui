<template>
  <div :class="dimensions">
    <cover v-if="format === 'cover'" alt="ccc" :url="state.cover" :cover-color="state.color" />
    <button-component :sb="true" @click="showOverlay"></button-component>
  </div>
</template>

<script lang="ts" setup>
import { Image as Cover } from '@podlove/components';
import { injectStore, mapState } from 'redux-vuex';
import ButtonComponent from './components/Button.vue';

import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from '../../store/selectors';
import { show } from '@podlove/button-actions/overlay';
import { computed } from 'vue';

const state = mapState({
  color: selectColor,
  cover: selectCover,
  format: selectFormat,
  size: selectSize,
  style: selectStyle
});

const dispatch = injectStore().dispatch;

const dimensions = computed(() => `${state.size.toLowerCase()}-${state.format.toLowerCase()}`);

const showOverlay = () => {
  dispatch(show());
};
</script>
