<template>
  <ul class="flex mobile:flex-col tablet:flex-row flex-wrap w-full">
    <li
      v-for="(entry, index) in state.clients"
      :key="index"
      class="block mb-2 mobile:w-full tablet:w-1/2"
      :aria-label="t('A11Y.CLIENT', entry)"
    >
      <a
        class="flex items-center w-full p-2 hover:bg-gray-200 rounded-sm cursor-pointer"
        rel="noopener"
        target="_blank"
        :style="state.font"
        :href="entry.rss ? null : entry.link"
        @click="onClick(entry)"
      >
        <span class="block w-6 mr-2">
          <img v-if="entry.icon" aria-hidden="true" :src="entry.icon" />
        </span>
        <span class="mr-2">{{ entry.title }}</span>
        <arrow-to-right-icon />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { ArrowToRightIcon } from '@podlove/components';
import { useI18n } from 'vue-i18n';
import { PodloveSubscribeButtonClient } from '@podlove/types';
import * as select from '../../store/selectors.js';

const { t } = useI18n();

const emit = defineEmits(['clientSelect']);

const state = mapState({
  clients: select.clients,
  font: select.theme.fontBold
});

const onClick = (client: PodloveSubscribeButtonClient) => {
  emit('clientSelect', client);
};
</script>
