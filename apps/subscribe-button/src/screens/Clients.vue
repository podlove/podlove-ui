<template>
  <div
    class="
      m-6
      p-6
      mobile:p-4
      max-w-xl
      w-full
      max-h-full
      bg-white
      text-gray-900
      overflow-y-auto
      rounded-sm
    "
  >
    <div class="mb-6 mobile:mb-4 flex justify-between items-center">
      <h1 class="tablet:text-2xl mobile:text-xl" :style="state.font">
        {{ $t('SUBSCRIBE') }}
      </h1>
      <button :title="$t('A11Y.CLOSE')" @click="close">
        <icon aria-hidden="true" type="close" />
      </button>
    </div>
    <divider class="mb-6" :color="state.shadeBase"></divider>
    <client-list @clientSelect="finish" />
  </div>
</template>

<script setup lang="ts">
import { injectStore, mapState } from 'redux-vuex';
import { Icon, Divider } from '@podlove/components';
import * as overlay from '@podlove/button-actions/overlay';
import * as finishCard from '@podlove/button-actions/finish-card';

import ClientList from '../components/client-list/ClientList.vue';
import * as select from '../store/selectors';

const state = mapState({
  font: select.theme.fontCi,
  shadeBase: select.theme.shadeBase
});

const dispatch = injectStore().dispatch;

const close = () => {
  dispatch(overlay.hide());
};

const finish = (client: finishCard.showPayload) => {
  dispatch(finishCard.show(client));
};
</script>
