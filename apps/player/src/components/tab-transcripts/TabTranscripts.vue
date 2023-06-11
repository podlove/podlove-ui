<template>
  <div data-test="tab-transcripts">
    <div class="header mobile:p-4 tablet:p-6">
      <tab-title tab="transcripts" @close="closeTab">
        {{ t('TRANSCRIPTS.TITLE') }}
      </tab-title>
      <search class="mb-6" />
    </div>
    <render-container v-if="prerender.length > 0" :prerender="prerender" />
    <prerender-container v-else :transcripts="state.timeline" @load="loadPrerender" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted, onUnmounted, ref } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { toggleTab } from '@podlove/player-actions/tabs';
import select from '../../store/selectors/index.js';

import TabTitle from '../tab-title/TabTitle.vue';

import Search from './components/Search.vue';
import RenderContainer from './components/Render.vue';
import PrerenderContainer from './components/Prerender.vue';

const { t } = useI18n();

const state = mapState({
  timeline: select.transcripts.timeline
});

const dispatch = injectStore().dispatch;

const prerender = ref([]);

onMounted(() => {
  render();
  window.addEventListener('resize', render.bind(this));
});

onUnmounted(() => {
  window.removeEventListener('resize', render.bind(this));
});

const loadPrerender = (prerender) => {
  prerender.value = prerender;
};

const render = () => {
  prerender.value = [];
};

const closeTab = () => {
  dispatch(toggleTab('transcripts'));
};
</script>

<style lang="postcss" scoped>
.header {
  height: 145px;
}

.body {
  height: 430px;
}
</style>
