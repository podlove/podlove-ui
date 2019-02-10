<template lang="pug">
  div.chapters-tab#tab-chapters
    entry-component(v-for="(chapter, index) in chapters" :chapter="chapter" :index="index" :key="index")
</template>

<script>
  import { mapState } from 'redux-vuex'
  import select from 'store/selectors'

  import EntryComponent from './components/Entry'

  export default {
    data: mapState({
      chapters: select.chapters.list
    }),
    components: {
      EntryComponent
    }
  }
</script>

<style lang="scss">
  @import '~styles/variables';

  .chapters-tab {
    width: 100%;
    padding: $padding 0;
  }
</style>
