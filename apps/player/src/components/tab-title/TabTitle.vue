<template>
  <div class="mb-6" data-test="tab-title">
    <div class="flex justify-between">
      <h1 class="text-xl mb-4" :style="state.font">
        <slot />
      </h1>
      <button
        class="h-6 mt-1"
        data-test="tab-title--close"
        :title="t(state.title.key, state.title.attr)"
        @click="close"
      >
        <close-icon />
      </button>
    </div>
    <div class="border-dotted border-b-2 border-gray-400 w-full" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { CloseIcon } from '@podlove/components';
import select from '../../store/selectors/index.js';

const { t } = useI18n();

const emits = defineEmits(['close']);

const props = defineProps({
  tab: {
    type: String,
    default: null
  }
});

const state = mapState({
  font: select.theme.fontCi,
  title: select.accessibility.closeTab(props.tab)
});

const close = () => {
  emits('close');
};
</script>
