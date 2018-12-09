<template lang="pug">
  h1.episode-title#header-title(:style="style" v-marquee)
    a(:href="link" :target="target" v-if="link") {{ title }}
    span(v-else) {{ title }}
</template>

<script>
  import { mapState } from 'redux-vuex'
  import select from 'store/selectors'

  export default {
    data: mapState({
      style: select.styles.title,
      title: select.episode.title,
      link: select.episode.link,
      target: select.target
    })
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .episode-title {
    margin: 0;
    font-weight: inherit;
    font-size: 1.8em;

    a, span {
      display: block;
    }
  }
</style>
