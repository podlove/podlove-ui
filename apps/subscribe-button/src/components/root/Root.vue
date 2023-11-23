<template>
  <div class="podlove-subscribe-button antialiased" :style="state.font">
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
import * as select from '../../store/selectors.js';

const state = mapState({
  font: select.theme.fontRegular,
  fonts: select.theme.fonts,

});

const theme = mapState({
  brand: select.theme.brand,
  brandLightest: select.theme.brandLightest,
  brandDarkest: select.theme.brandDarkest,
  brandDark: select.theme.brandDark,
  contrast: select.theme.contrast,
  alt: select.theme.alt
})
</script>

<style lang="postcss">
.podlove-subscribe-button {
  --podlove-subscribe-button--finish-card--tooltip--color: v-bind('theme.alt');
  --podlove-subscribe-button--finish-card--tooltip--background: v-bind('theme.brand');
  --podlove-subscribe-button--finish-card--tooltip-button--color: v-bind('theme.alt');
  --podlove-subscribe-button--finish-card--tooltip-button--background: v-bind('theme.brand');
}
</style>
