<template lang="pug">
  div(data-test="tab-transcripts")
    div.header(class="mobile:p-4 tablet:p-6")
      tab-title(@close="closeTab") {{ $t('TRANSCRIPTS.TITLE') }}
      search.mb-6
    //- Render
    render-container(:prerender="prerender" v-if="prerender.length > 0")
    //- Prerender
    prerender-container(:transcripts="timeline" @load="loadPrerender" v-else)
</template>

<script>
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
import select from 'store/selectors'

import TabTitle from '../tab-title'

import Search from './components/Search'
import RenderContainer from './components/Render'
import PrerenderContainer from './components/Prerender'

export default {
  components: {
    TabTitle,
    Search,
    RenderContainer,
    PrerenderContainer
  },
  data() {
    return {
      ...this.mapState({
        activeTranscript: select.transcripts.active,
        activeFollow: select.transcripts.follow,
        selectedSearch: select.transcripts.searchSelected,
        searchQuery: select.transcripts.searchQuery,
        timeline: select.transcripts.timeline
      }),
      prerender: []
    }
  },
  mounted() {
    this.render()
    window.addEventListener('resize', this.render.bind(this))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.render.bind(this))
  },
  methods: {
    loadPrerender(prerender) {
      this.prerender = prerender
    },
    render() {
      this.prerender = []
    },
    closeTab() {
      store.dispatch(toggleTab('transcripts'))
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  height: 145px;
}

.body {
  height: 430px;
}
</style>
