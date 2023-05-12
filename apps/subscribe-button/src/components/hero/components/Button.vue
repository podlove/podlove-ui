<template>
  <button :style="filling" @click="onClick">
    <icon type="subscribe" :size="iconSize"></icon>
    <span v-if="state.format !== 'square'">{{ $t('SUBSCRIBE') }}</span>
  </button>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import Icon from '@podlove/components/icons';

import {
  selectColor,
  selectCover,
  selectFormat,
  selectSize,
  selectStyle
} from '../../../store/selectors';
import { computed } from 'vue';

const emits = defineEmits(['click']);

const state = mapState({
  color: selectColor,
  cover: selectCover,
  format: selectFormat,
  size: selectSize,
  style: selectStyle
});

const filling = computed(() => {
  if (state.style === 'outline') {
    return `border: 2px solid ${state.color}; color: ${state.color};`;
  } else if (state.style === 'frameless') {
    return `color: ${state.color}; background: none;`;
  } else {
    return `background: ${state.color};`;
  }
});

const iconSize = computed(() => {
  let size = 20;

  switch (state.size) {
    case 'small':
      size = 16;
      break;
    case 'medium':
      size = 18;
      break;
    case 'big':
      size = 22;
      break;
  }
  return size;
});

const onClick = () => {
  emits('click');
};
</script>

<style lang="scss"></style>
