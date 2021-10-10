<template>
  <div data-test="tab-transcripts">
    <div class="header mobile:p-4 tablet:p-6">
      <tab-title tab="transcripts" @close="closeTab">
        {{ $t('TRANSCRIPTS.TITLE') }}
      </tab-title>
      <search class="mb-6" />
    </div>
    <render-container v-if="prerender.length > 0" :prerender="prerender" />
    <prerender-container v-else :transcripts="state.timeline" @load="loadPrerender" />
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
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
  setup() {
    return {
      state: mapState({
        timeline: select.transcripts.timeline
      }),
      dispatch: injectStore().dispatch
    }
  },
  data() {
    return {
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
      this.dispatch(toggleTab('transcripts'))
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
