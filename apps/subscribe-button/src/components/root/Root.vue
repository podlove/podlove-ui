<template>
  <div class="podlove-subscribe-button antialiased">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import * as select from '../../store/selectors.js';

const theme = mapState({
  brand: select.theme.brand,
  brandLightest: select.theme.brandLightest,
  brandDarkest: select.theme.brandDarkest,
  brandDark: select.theme.brandDark,
  contrast: select.theme.contrast,
  alt: select.theme.alt,
  shadeBase: select.theme.shadeBase,
})
</script>

<style lang="postcss">
.podlove-subscribe-button {
  --podlove-subscribe-button--finish-card--tooltip--color: v-bind('theme.alt');
  --podlove-subscribe-button--finish-card--tooltip--background: v-bind('theme.brand');
  --podlove-subscribe-button--finish-card--tooltip-button--color: v-bind('theme.alt');
  --podlove-subscribe-button--finish-card--tooltip-button--background: v-bind('theme.brand');

  --podlove-subscribe-button--divider--color: v-bind('theme.shadeBase')
}
</style>
