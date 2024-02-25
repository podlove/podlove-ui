<template>
  <div v-if="episodesToLoad">
    <button class="p-2 px-4 rounded border border-primary-700 bg-primary-600 uppercase text-gray-200 hover:bg-primary-700 hover:text-gray-100" @click="loadMore">{{ $t('ARCHIVE.LOAD_MORE') }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { injectStore, mapState } from 'redux-vuex';
import { selectors, actions } from '../../logic';

const store = injectStore();

const state = mapState({
  episodes: selectors.view.archive.episodes,
  page: selectors.view.archive.page
});

const episodesToLoad = computed(() => state.page * 25 <= state.episodes.length);

const loadMore = () => {
  store.dispatch(actions.view.archiveLoadMore());
}
</script>
