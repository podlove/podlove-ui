<template>
  <div class="w-full mobile:p-4 tablet:p-6" data-test="tab-files">
    <tab-title tab="files" @close="closeTab">
      {{ $t('FILES.TITLE') }}
    </tab-title>
    <div class="tablet:flex tablet:flex-1 tablet:flex-wrap w-full">
      <file
        v-for="(file, index) in state.files"
        :key="index"
        :file="file"
        class="mb-4 tablet:w-1/2 mobile:mb-4 mobile:block"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { toggleTab } from '@podlove/player-actions/tabs';

import select from '../../store/selectors/index.js';

import TabTitle from '../tab-title/TabTitle.vue';
import File from './components/File.vue';

const state = mapState({
  files: select.files.files
});

const dispatch = injectStore().dispatch;

const closeTab = () => {
  dispatch(toggleTab('files'));
};
</script>
