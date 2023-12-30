<template>
  <div class="py-8 border-gray-400 border-dashed" :class="{ 'pt-0': first, 'border-b': last }">
    <div class="flex">
      <div class="player-tile-button w-20 h-20 mr-4 relative flex-shrink-0 mt-1">
        <img
          :src="state.episode.poster || state.poster"
          :width="100"
          :height="100"
          class="rounded w-20 h-20 ring-1 ring-black ring-opacity-5"
        />
        <div
          class="
            absolute
            flex
            opacity-50
            hover:opacity-100
            items-center
            justify-center
            w-20
            h-20
            inset-0
          "
        >
          <play-button :size="50" :id="state.episode.id" />
        </div>
      </div>
      <div class="flex flex-col overflow-hidden">
        <div class="h-20 mb-2 sm:h-auto sm:mb-0">
          <a
            :href="`/episodes/${state.episode.id}`"
            v-if="state.episode.title"
            class="leading-tight sm:leading block text-xl mb-1 uppercase whitespace-nowrap truncate"
            >{{ state.episode.mnemonic }} {{ state.episode.title }}</a
          >
          <div class="block md:flex mb-2">
            <div class="flex mb-2 md:mb-0">
              <contributor
                class="mr-1 w-6"
                v-for="(contributor, index) in state.episode.contributors"
                :name="contributor.name"
                :avatar="contributor.image"
                :role="contributor.role"
                :slug="contributor.slug"
                :id="contributor.id"
                :key="`archive-${state.episode.id}-contributor-${index}`"
              />
            </div>
            <div class="flex">
              <span
                class="text-gray-500 mx-1 hidden md:inline"
                v-if="state.episode.contributors.length > 0"
                >・</span
              >
              <span class="block font-light text-gray-500 text-base" v-if="publicationDate">{{
                publicationDate
              }}</span>
              <span class="text-gray-500 mx-1" v-if="duration">・</span>
              <span class="block font-light text-gray-500" v-if="duration">{{ duration }}</span>
            </div>
          </div>
        </div>
        <div class="summary font-light hidden md:block" v-if="summary" v-html="summary"></div>
      </div>
    </div>
    <div class="summary font-light block md:hidden" v-if="summary" v-html="summary"></div>
  </div>
</template>

<script setup lang="ts">
import { toHumanTime } from '@podlove/utils/time';
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import { truncate } from 'lodash-es';
import { selectors } from '../../logic';
import PlayButton from '../../components/PlayButton.vue';
import Contributor from '../../components/Contributor.vue';

const props = defineProps<{
  id: string;
  first: boolean;
  last: boolean;
}>();

const state = mapState({
  episode: selectors.episode.data(props.id),
  poster: selectors.podcast.image,
  locale: selectors.runtime.locale
});

const publicationDate = computed(() =>
  state.episode.publicationDate
    ? new Date(state.episode.publicationDate).toLocaleDateString(state.locale)
    : null
);

const duration = computed(() =>
  state.episode.duration ? toHumanTime(state.episode.duration) : null
);

const summary = truncate(state.episode.description, { length: 200 });
</script>
