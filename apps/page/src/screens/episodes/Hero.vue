<template>
  <header-container class="pb-40">
    <div class="w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div class="w-[180px] h-[180px] relative mb-4 md:mb-0 md:mr-8">
          <img
            :src="state.episode.poster || state.poster"
            :width="180"
            :height="180"
            class="rounded shadow-lg border border-primary-700"
          />
          <div
            class="
              absolute
              w-full
              h-full
              inset-0
              flex
              items-center
              justify-center
              opacity-75
              hover:opacity-100
              transition
              ease-in
              duration-100
            "
          >
            <play-button :size="150" :id="id" />
          </div>
        </div>
        <div class="flex flex-col items-center md:block">
          <div class="text-gray-500 font-mono text-sm py-1">
            <span>{{ publicationDate }}</span>
            <span class="mx-2">・</span>
            <span>{{ duration }}</span>
          </div>
          <a :href="`/episodes/${id}`" class="text-center md:text-left">
            <h1
              v-if="state.episode.title"
              class="text-gray-100 text-3xl mb-5"
              v-html="state.episode.title"
            />
          </a>
          <div class="w-full flex flex-wrap justify-center md:justify-start">
            <div
              class="text-center flex flex-col items-center mx-2 mb-2 w-16"
              :class="{ 'ml-0': index === 0 }"
              v-for="(contributor, index) in state.episode.contributors"
              :key="`episode-${id}-contributor-${index}`"
            >
              <contributor
                class="block w-12 mb-1"
                :name="contributor.name"
                :avatar="contributor.image"
                :role="contributor.role"
                :slug="contributor.slug"
                :id="contributor.id"
              />
              <span class="text-gray-300">{{ contributor.nickname || first((contributor.name || '').split(' ')) }}</span>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </header-container>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { toHumanTime } from '@podlove/utils/time';
import { computed } from 'vue';
import { first } from 'lodash-es';
import HeaderContainer from '../../components/HeaderContainer.vue';
import Contributor from '../../components/Contributor.vue';
import PlayButton from '../../components/PlayButton.vue';
import { selectors } from '../../logic';

const props = defineProps<{ id: string }>();

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
</script>
