<template>
  <header
    class="
      flex
      h-12
      bg-primary-900
      text-complementary-900
      font-light
      justify-center
      items-center
      px-16
      border-b border-complementary-300
      top-0
      w-full
      overflow-hidden
    "
  >
    <nav class="flex w-app items-center justify-center">
      <a :href="state.index" class="mr-4 font-semibold">
        {{ state.title }}
      </a>
      <a class="mr-4 font-light" :href="state.index" :title="state.title">{{ $t('HEADER.EPISODES') }}</a>
      <a class="mr-4 font-light cursor-pointer" @click="showOverlay()">{{
        $t('HEADER.SUBSCRIBE')
      }}</a>
      <a class="mr-4 ml-auto font-light cursor-pointer" @click="showSearch()"><search-icon /></a>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { SearchIcon } from '@podlove/components';
import { mapState, injectStore } from 'redux-vuex';

import { selectors, actions } from '../logic';

const store = injectStore();

const state = mapState({
  title: selectors.podcast.title,
  poster: selectors.podcast.poster,
  feed: selectors.podcast.feed,
  index: selectors.router.index
});

const showOverlay = () => {
  store.dispatch(actions.subscribeButton.toggleSubscribeOverlay());
};

const showSearch = () => {
  store.dispatch(actions.search.show());
};
</script>
