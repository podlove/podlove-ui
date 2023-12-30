<template>
  <header
    class="
      flex
      h-12
      bg-primary-900
      text-gray-100
      font-light
      justify-center
      items-center
      px-16
      border-b border-gray-600
      top-0
      w-full
      overflow-hidden
    "
  >
    <nav class="flex w-app items-center justify-center">
      <a :href="`/${state.feed}`" class="mr-4 text-gray-100 font-semibold">
        {{ state.title }}
      </a>
      <a class="mr-4 font-light" :href="`/${state.feed}`" :title="state.title">{{ t('HEADER.EPISODES') }}</a>
      <!-- <a class="mr-4 font-light" href="/contributors">{{ t('HEADER.CONTRIBUTORS') }}</a> -->
      <a class="mr-4 font-light cursor-pointer" @click="showOverlay">{{
        $t('HEADER.SUBSCRIBE')
      }}</a>
      <a class="mr-4 ml-auto font-light cursor-pointer" @click="showSearch"><search-icon /></a>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { SearchIcon } from '@podlove/components';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';

import { selectors, actions } from '../logic';

const { t } = useI18n();

const store = injectStore();

const state = mapState({
  title: selectors.podcast.title,
  image: selectors.podcast.image,
  feed: selectors.podcast.feed
});

const showOverlay = () => {
  store.dispatch(actions.toggleSubscribeOverlay());
};

const showSearch = () => {
  store.dispatch(actions.showSearch());
};
</script>
