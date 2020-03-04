<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-shownotes")
    tab-title(@close="closeTab") {{ $t('SHOWNOTES.TITLE') }}

    h4.text-sm.font-bold {{ showTitle }}
    h3.text-lg.font-bold.mb-4 {{ episodeTitle }}

    p.text-base.font-semibold.mb-3 {{ subtitle }}

    p.mb-3(v-html="summary")

    divider.mb-4

    div(v-for="(group, gid) in groups" :key="`group-${gid}`")
      h3.text-sm.font-bold.mb-4 {{ group.title }}
      div.flex.flex-wrap
        div(class="flex items-center mr-16 last:mr-0 mb-4" v-for="(contributor, cid) in group.contributors" :key="`group-${gid}-contributor-${cid}`")
          img.rounded-full.h-16(:src="contributor.avatar")
          span.text-base.font-semibold.pr-4.pl-4 {{ contributor.name }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
import select from 'store/selectors'

import TabTitle from '../tab-title'
import Divider from '../divider'

export default {
  components: {
    TabTitle,
    Divider
  },

  data: mapState({
    showTitle: select.show.title,
    episodeTitle: select.episode.title,
    subtitle: select.episode.subtitle,
    summary: select.episode.summary,
    groups: select.contributors.groups
  }),

  methods: {
    closeTab() {
      store.dispatch(toggleTab('shownotes'))
    }
  }
}
</script>
