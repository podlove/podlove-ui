<template>
  <div class="w-full mobile:p-4 tablet:p-6 max-h-tab" data-test="tab-chapters">
    <tab-title tab="chapters" @close="closeTab">
      {{ t('CHAPTERS.TITLE') }}
    </tab-title>
    <ol class="sr-only" :aria-label="t(state.a11y.key, state.a11y.attr)">
      <a11y
        v-for="(chapter, index) in state.chapters"
        :key="`a11y-${index}`"
        :chapter="chapter"
        :index="index"
      />
    </ol>
    <div
      class="
        body
        overflow-y-auto overflow-x-hidden
        -mx-2
        mobile:-mr-4
        tablet:-mr-6
        mobile:pr-4
        tablet:pr-6
      "
    >
      <entry
        v-for="(chapter, index) in state.chapters"
        :key="`chapter-${index}`"
        :chapter="chapter"
        :index="index"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { toggleTab } from '@podlove/player-actions/tabs';

const { t } = useI18n();

import select from '../../store/selectors/index.js';

import TabTitle from '../tab-title/TabTitle.vue';
import Entry from './components/Entry.vue';
import A11y from './components/A11y.vue';

const state = mapState({
  chapters: select.chapters.list,
  a11y: select.accessibility.chapterList
});

const dispatch = injectStore().dispatch;

const closeTab = () => {
  dispatch(toggleTab('chapters'));
};
</script>
