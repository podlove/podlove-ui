<template>
  <div class="p-6 mobile:p-4 mobile:text-xl max-w-xl w-full max-h-full bg-white text-gray-900">
    <div class="mb-6 mobile:mb-4 flex justify-between items-center rounded-sm">
      <button class="text-xl flex items-center" :title="$t('A11Y.BACK')" @click="back">
        <icon aria-hidden="true" type="arrow-to-left" class="mr-2" />
        <span>{{ $t('BACK_TO_LIST') }}</span>
      </button>
      <button :title="$t('A11Y.CLOSE')" @click="close">
        <icon aria-hidden="true" type="close" />
      </button>
    </div>
    <divider class="mb-6" :color="state.shadeBase"></divider>
    <finish-card class="text-base" />
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Icon, Divider } from '@podlove/components';

import * as overlay from '@podlove/button-actions/overlay';
import * as list from '@podlove/button-actions/list';

import FinishCard from '../components/finish-card/FinishCard.vue';
import * as select from '../store/selectors';

const state = mapState({
  shadeBase: select.theme.shadeBase
});

const dispatch = injectStore().dispatch;

const close = () => {
  dispatch(overlay.hide());
};

const back = () => {
  dispatch(list.show());
};
</script>
