<template>
  <transition name="fade">
    <div
      v-if="state.visible"
      @click="outerClick"
      class="search w-full h-full fixed left-0 top-0 z-50"
    >
      <div
        ref="content"
        class="
          relative
          w-11/12
          lg:w-7/12
          max-w-4xl
          mt-16
          mb-16
          bg-gray-100
          border-gray-400
          rounded
          shadow-lg
          mx-auto
        "
        @mouseleave="selectSearchResult(null)"
      >
        <button
          class="absolute top-0 right-0 -mt-12 lg:-mr-10 lg:-mt-10 text-gray-100"
          @click="hideSearch"
        >
          <close-icon :size="35" />
        </button>
        <div class="w-full flex px-5 py-2">
          <search-icon class="icon mt-[5px]" :size="35" v-if="state.initialized" />
          <loader class="text-gray-500 mt-2" :size="35" v-else />
          <input
            v-if="state.initialized"
            type="text"
            class="font-light text-2xl text-gray-500 w-full p-2 focus:outline-none"
            @input="searchQuery($event)"
            ref="search"
            id="search-input"
            :placeholder="t(`SEARCH.PLACEHOLDER`)"
            :value="state.query"
          />
          <span v-else class="font-light text-2xl text-gray-500 w-full p-2">{{
            t(`SEARCH.INDEXING`)
          }}</span>
          <button class="text-gray-500 -ml-5" @click="searchQuery()">
            <search-clear-icon
              v-if="state.query && state.query.length > 0"
              class="text-gray-100"
              :size="35"
            />
          </button>
        </div>
        <transition name="fadeHeight" mode="out-in">
          <div>
            <div
              class="border-t border-gray-300 px-6 py-6 text-gray-600 text-center"
              v-if="!state.hasResults && state.query && state.query.length > 0"
            >
              {{ t('SEARCH.NO_RESULTS') }}
            </div>
            <div
              class="results border-t border-gray-300 px-3 py-3 overflow-y-auto"
              v-if="state.hasResults"
              ref="results"
            >
              <div class="text-gray-800 tracking-wide" v-if="state.contributors.length > 0">
                <span class="font-normal px-3 mt-3 text-gray-700 opacity-75">
                  {{ t(`SEARCH.CATEGORY.CONTRIBUTOR`) }}
                </span>
                <button
                  @click="selectSearchResult(result.id)"
                  class="
                    flex
                    items-center
                    px-3
                    py-3
                    m-1
                    focus:
                    font-normal
                    w-full
                    rounded-lg
                    focus:outline-none
                  "
                  v-for="result in state.contributors"
                  :class="{ 'bg-gray-200': state.focused === result.id }"
                  :key="result.id"
                  :data-result="result.id"
                  @mouseover="selectSearchResult(result.id)"
                  @focus="selectSearchResult(result.id)"
                >
                  <img
                    v-if="result.avatar"
                    :src="result.avatar"
                    :width="30"
                    :height="30"
                    class="rounded-full mr-2"
                  />
                  <user-icon v-else :size="34" class="icon rounded-full mr-3 w-8 h-8" />

                  {{ result.name }}
                </button>
              </div>
              <div class="text-gray-800 tracking-wide" v-if="state.episodes.length > 0">
                <span class="font-normal px-3 mt-3 text-gray-700 opacity-75">
                  {{ t(`SEARCH.CATEGORY.EPISODE`) }}
                </span>
                <a
                  :href="episodeLink(result.episodeId)"
                  @click="hideSearch"
                  class="
                    flex
                    items-center
                    px-3
                    py-3
                    m-1
                    font-normal
                    w-full
                    rounded-lg
                    focus:outline-none
                  "
                  v-for="result in state.episodes"
                  :class="{ 'bg-gray-200': state.focused === result.id }"
                  :key="result.id"
                  :data-result="result.id"
                  @mouseover="selectSearchResult(result.id)"
                  @focus="selectSearchResult(result.id)"
                >
                  <span
                    class="
                      rounded-full
                      bg-complementary-100
                      text-primary-900
                      px-2
                      p-1
                      mr-3
                      text-sm
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                    "
                    >{{ result.episodeId }}</span
                  >
                  <div class="truncate leading-tight w-full">
                    <div class="italic truncate">{{ result.title }}</div>
                    <div class="text-sm text-gray-400 font-light truncate">
                      {{ result.description }}
                    </div>
                  </div>
                </a>
              </div>
              <div class="text-gray-800 tracking-wide" v-if="state.transcripts.length > 0">
                <span class="font-normal px-3 mt-3 text-gray-700 opacity-75">
                  {{ t(`SEARCH.CATEGORY.TRANSCRIPT`) }}
                </span>
                <a
                  :href="episodeLink(result.episodeId) + `#:~:text=${result.text}`"
                  @click="hideSearch"
                  class="
                    flex
                    items-center
                    px-3
                    py-2
                    m-1
                    font-normal
                    rounded-lg
                    w-full
                    justify-start
                    text-left
                    focus:outline-none
                  "
                  v-for="result in state.transcripts"
                  :class="{ 'bg-gray-200': state.focused === result.id }"
                  :key="result.id"
                  :data-result="result.id"
                  @mouseover="selectSearchResult(result.id)"
                  @focus="selectSearchResult(result.id)"
                >
                  <img
                    v-if="speakerAvatar(result.speaker)"
                    :src="speakerAvatar(result.speaker)"
                    :width="30"
                    :height="30"
                    class="rounded-full mr-3 w-8 h-8"
                  />
                  <user-icon v-else :size="34" class="icon rounded-full mr-3 w-8 h-8" />
                  <div class="truncate leading-tight w-full">
                    <div class="italic truncate">{{ result.text }}</div>
                    <div class="text-sm text-gray-400 font-light truncate">
                      {{
                        t('SEARCH.EPISODE', {
                          number: result.episodeId,
                          title: result.episodeTitle
                        })
                      }}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { injectStore, mapState } from 'redux-vuex';
import { get } from 'lodash-es';
import { CloseIcon, SearchIcon, SearchClearIcon, UserIcon } from '@podlove/components';
import { useTranslations } from '@podlove/utils/translate';

import Loader from '../components/Loader.vue';
import { selectors, actions } from '../logic';
import { findPerson } from '../lib/persons';
import type { Person } from '../types/feed.types';

const t = useTranslations();
const content = ref(null);

const state = mapState({
  visible: selectors.search.visible,
  query: selectors.search.query,
  contributors: selectors.search.contributors,
  episodes: selectors.search.episodes,
  transcripts: selectors.search.transcripts,
  initialized: selectors.search.initialized,
  hasResults: selectors.search.hasResults,
  focused: selectors.search.selectedResult,
  speakers: selectors.contributors.list
});

const store = injectStore();

const episodeLink = (episode: string) => selectors.router.episode(episode)(store.getState());

const speakerAvatar = (speaker: string): string =>
  (findPerson(state.speakers, speaker) as unknown as Person)?.avatar || '';

const hideSearch = () => {
  store.dispatch(actions.search.hide());
};

const outerClick = (event: Event) => {
  const target: HTMLElement | null = get(event, 'target', null) as HTMLElement;

  if (target && !target.contains(content.value)) {
    return;
  }
  event.preventDefault();
  searchQuery();
};

const searchQuery = (event?: Event) => {
  const query = get(event, ['target', 'value'], null);
  store.dispatch(actions.search.search(query));
};

const selectSearchResult = (result: string | null) =>
  store.dispatch(actions.search.selectSearchResult(result));
</script>

<style scoped>
.search {
  background: rgba(var(--gray-color-400), 0.7);
}

.icon {
  --podlove-component--icon--color: rgb(var(--gray-color-500));
}

.results {
  max-height: calc(100vh - 52px - 64px - 64px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  display: block;
  opacity: 0;
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: max-height 300ms;
  max-height: calc(100vh - 52px - 64px - 64px);
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
