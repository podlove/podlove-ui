<template lang="pug">
  div.transcripts(:class="{ 'has-search-results': hasSearchResults }")
    div.transcripts-header
      search
      //- follow.transcripts-follow-button
    //- Render
    //- render-container.transcripts-container(:prerender="prerender" v-if="prerender && prerender.length > 0")
    //- Prerender
    //- prerender-container.transcripts-container(:transcripts="transcripts.timeline" @load="loadPrerender" v-else)
</template>

<script>
// import PrerenderContainer from './Prerender'
// import RenderContainer from './Render'
// import Search from './Search'
// import Follow from './Follow'

import select from 'store/selectors'

import Search from './components/Search'

export default {
  data () {
    return {
      ...this.mapState({
        activeTranscript: select.transcripts.active,
        activeFollow: select.transcripts.follow,
        selectedSearch: select.transcripts.searchSelected,
        searchQuery: select.transcripts.searchQuery,
      }),
      prerender: null
    }
  },
  methods: {
    loadPrerender (prerender) {
      this.prerender = prerender
    },
    render () {
      this.prerender = []
    }
  },
  computed: {
    hasSearchResults () {
      return this.searchQuery.length > 2
    }
  },
  mounted () {
    this.render()
    window.addEventListener('resize', this.render.bind(this))
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.render.bind(this))
  },
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .transcripts {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .transcripts-header {
    height: $transcripts-header-height;
    box-shadow: 0 4px 2px -2px rgba($overlay-color, 0.1);
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > * {
      height: $transcripts-header-element-height;
    }
  }

  .transcripts-container {
    position: relative;
    max-height: $tabs-body-max-height - $transcripts-height;
    overflow-y: auto;
    padding: 0;
  }

  @media screen and (max-width: $width-m) {
    .transcripts.has-search-results .transcripts-follow-button {
      display: none;
    }

    .transcripts.has-search-results .search-navigation {
      justify-content: flex-end;
      margin-right: 0;
    }
  }
</style>
