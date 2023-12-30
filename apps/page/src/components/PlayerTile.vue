<template>
  <div>
    <div class="flex">
      <div class="player-tile-button w-20 h-20 mr-4 relative flex-shrink-0 mt-1">
        <res-image
          :src="episode.poster"
          :width="100"
          :height="100"
          class="rounded w-20 h-20 ring-1 ring-black ring-opacity-5"
        />
        <div
          class="absolute flex opacity-50 hover:opacity-100 items-center justify-center w-20 h-20 inset-0"
        >
          <ClientOnly>
            <play-button
              :size="50"
              :id="episode.id"
            />
          </ClientOnly>
        </div>
      </div>
      <div class="flex flex-col overflow-hidden">
        <div class="h-20 mb-2 sm:h-auto sm:mb-0">
          <g-link
            :to="episode.path"
            v-if="episode.title"
            class="leading-tight sm:leading block text-xl mb-1 uppercase whitespace-nowrap truncate"
            >{{ episode.mnemonic }} {{ episode.title }}</g-link
          >
          <div class="block md:flex mb-2">
            <div class="flex mb-2 md:mb-0">
              <contributor
                class="mr-1 w-6"
                v-for="contributor in contributors"
                :contributor="contributor"
                :key="`contributor-${contributor.id}`"
              />
            </div>
            <div class="flex">
              <span class="text-gray-500 mx-1 hidden md:inline" v-if="contributors.length > 0"
                >・</span
              >
              <span
                class="block font-light text-gray-500 text-base"
                v-if="episode.publicationDate"
                >{{ date(episode.publicationDate) }}</span
              >
              <span class="text-gray-500 mx-1" v-if="episode.duration">・</span>
              <span class="block font-light text-gray-500" v-if="episode.duration">{{
                toHumanTime(episode.duration)
              }}</span>
            </div>
          </div>
        </div>
        <div class="summary font-light hidden md:block" v-if="summary" v-html="summary"></div>
      </div>
    </div>
    <div class="summary font-light block md:hidden" v-if="summary" v-html="summary"></div>
  </div>
</template>

<script>
import { pathOr, path } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'
import truncate from 'trunc-text'
import { contributors } from '~/config';

import Contributor from './Contributor'
import PlayButton from './PlayButton'
import ResImage from './ResImage'

export default {
  components: {
    PlayButton,
    Contributor,
    ResImage
  },

  props: {
    episode: {
      type: Object,
      default: () => ({
        id: null,
        title: null,
        mnemonic: null,
        summary: null,
        publicationDate: null,
        poster: null,
        show: null,
        path: null,
        contributors: [],
        duration: null
      })
    }
  },

  computed: {
    summary() {
      return truncate(pathOr('', ['episode', 'summary'], this), 400)
    },
    contributors() {
      return pathOr([], ['episode', 'contributors'], this)
        .filter((contributor) => contributors.groups.includes(path(['group', 'slug'], contributor)))
        .map((contributor) => ({
          id: path(['details', 'id'], contributor),
          slug: path(['details', 'slug'], contributor),
          name: path(['details', 'name'], contributor),
          avatar: path(['details', 'avatar'], contributor),
          role: path(['role', 'title'], contributor)
        }))
    }
  },

  methods: {
    date(date) {
      return new Date(date).toLocaleDateString()
    },
    toHumanTime
  }
}
</script>

<style scoped>
.summary {
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.player-tile-button {
  width: 85px;
  height: 85px;
}
</style>
