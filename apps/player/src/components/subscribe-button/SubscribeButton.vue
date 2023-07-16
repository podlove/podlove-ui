<template>
  <button
    v-if="state.available"
    class="h-6 px-2 flex items-center text-xs rounded-sm border whitespace-no-wrap"
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
  color: select.theme.brandDark,
  background: select.theme.alt,
  font: select.theme.fontBold,
  available: select.subscribeButton.available,
  a11y: select.accessibility.subscribeButton
});

const dispatch = injectStore().dispatch;

const style = computed(() => ({
  color: state.color,
  'border-color': state.color,
  background: state.background,
  ...state.font
}));

const show = () => {
  dispatch(overlay.show());
};
</script>
