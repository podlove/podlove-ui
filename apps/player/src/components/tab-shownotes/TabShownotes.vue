<template>
  <div class="w-full mobile:p-4 tablet:p-6" data-test="tab-shownotes">
    <tab-title tab="shownotes" @close="closeTab">
      {{ $t('SHOWNOTES.TITLE') }}
    </tab-title>

    <h4 class="text-sm font-bold">
      {{ state.showTitle }}
    </h4>
    <h3 class="text-lg font-bold mb-4">
      {{ state.episodeTitle }}
    </h3>

    <p class="text-base font-semibold mb-3">
      {{ state.subtitle }}
    </p>

    <p class="mb-3" v-html="state.summary"></p>

    <divider class="mb-4" />

    <div v-for="(group, gid) in state.groups" :key="`group-${gid}`">
      <h3 class="text-sm font-bold mb-4">
        {{ group.title }}
      </h3>
      <div class="flex flex-wrap">
        <div
          v-for="(contributor, cid) in group.contributors"
          :key="`group-${gid}-contributor-${cid}`"
          class="flex items-center mr-16 last:mr-0 mb-4"
        >
          <img class="rounded-full h-16" :src="contributor.avatar" />
          <span class="text-base font-semibold pr-4 pl-4">{{ contributor.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import select from 'store/selectors'

import TabTitle from '../tab-title'
import Divider from '../divider'

export default {
  components: {
    TabTitle,
    Divider
  },

  setup() {
    return {
      state: mapState({
        showTitle: select.show.title,
        episodeTitle: select.episode.title,
        subtitle: select.episode.subtitle,
        summary: select.episode.summary,
        groups: select.contributors.groups
      }),
      dispatch: injectStore().dispatch
    }
  },

  methods: {
    closeTab() {
      this.dispatch(toggleTab('shownotes'))
    }
  }
}
</script>
