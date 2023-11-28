<template>
  <div class="podlove-subscribe-button--finish p-6 mobile:p-4 mobile:text-xl max-w-xl w-full max-h-full bg-white text-gray-900">
    <div class="mb-6 mobile:mb-4 flex justify-between items-center rounded-sm">
      <button class="text-xl flex items-center" :title="t('A11Y.BACK')" @click="back">
        <arrow-to-left-icon class="mr-2" />
        <span>{{ t('BACK_TO_LIST') }}</span>
      </button>
      <button :title="t('A11Y.CLOSE')" @click="close">
        <close-icon />
      </button>
    </div>
    <divider class="mb-6"></divider>
    <finish-card class="text-base" />
  </div>
</template>

<script lang="ts" setup>
import { injectStore } from 'redux-vuex';
import { ArrowToLeftIcon, CloseIcon, Divider } from '@podlove/components';
import { useI18n } from 'vue-i18n';

import * as overlay from '@podlove/button-actions/overlay';
import * as list from '@podlove/button-actions/list';

import FinishCard from '../components/finish-card/FinishCard.vue';

const { t } = useI18n();

const dispatch = injectStore().dispatch;

const close = () => {
  dispatch(overlay.hide());
};

const back = () => {
  dispatch(list.show());
};
</script>

<style lang="postcss" scoped>
.podlove-subscribe-button--clients {
  --podlove-component--divider--color: var(--podlove-subscribe-button--divider--color);
}
</style>
