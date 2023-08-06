<template>
  <button
    v-if="state.available"
    class="
      podlove-player--subscribe-button
      h-6
      px-2
      flex
      items-center
      text-xs
      rounded-sm
      border
      whitespace-nowrap
    "
    data-test="subscribe-button"
    :aria-label="t(state.a11y.key, state.a11y.attr)"
    :style="style"
    @click="show"
  >
    <plus-icon class="mr-1" />
    <span>{{ t('SUBSCRIBE') }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { PlusIcon } from '@podlove/components';
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import * as overlay from '@podlove/button-actions/overlay';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  font: select.theme.fontBold,
  available: select.subscribeButton.available,
  a11y: select.accessibility.subscribeButton
});

const dispatch = injectStore().dispatch;

const style = computed(() => ({
  ...state.font
}));

const show = () => {
  dispatch(overlay.show());
};
</script>

<style lang="postcss" scoped>
.podlove-player--subscribe-button {
  --podlove-component--icon--color: var(--podlove-player--subscribe-button--icon-color);
  color: var(--podlove-player--subscribe-button--color);
  border-color: var(--podlove-player--subscribe-button--border-color);
  background: var(--podlove-player--subscribe-button--background);
}
</style>
