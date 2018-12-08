<template lang="pug">
  h3.description#header-subtitle(:style="style" v-if="subtitle") {{ subtitle }}
</template>

<script>
  import { mapState } from 'redux-vuex'
  import select from 'store/selectors'

  export default {
    data: mapState({
      style: select.styles.description,
      subtitle: select.episode.subtitle
    })
  }
</script>

<style lang="scss" scoped>
  .description {
    overflow: hidden;
    margin: 0;
    height: 2.75em;
    line-height: 1.3em;
    font-size: 1.1em;
    font-weight: 100;
    hyphens: auto;
  }
</style>
