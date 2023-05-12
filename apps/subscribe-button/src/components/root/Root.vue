<template>
  <div class="antialiased" :style="state.font">
    <slot></slot>

    <font
      v-for="(font, index) in state.fonts"
      :key="index"
      :src="font.src"
      :name="font.name"
      :weight="font.weight"
    />
  </div>
</template>

<script lang="ts" setup>
import { Font } from '@podlove/components';
import { mapState } from 'redux-vuex';
import * as select from '../../store/selectors';

const state = mapState({
  font: select.theme.fontRegular,
  fonts: select.theme.fonts
});
</script>
