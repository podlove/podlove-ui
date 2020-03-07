<template lang="pug">
  h1(:style="style" data-test="episode-title")
    a.episode-title(:href="link" :target="target" v-if="link" data-test="episode-title--link") {{ title }}
    span.episode-title(v-else data-test="episode-title--text") {{ title }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    font: select.theme.fontBold,
    color: select.theme.contrast,
    title: select.episode.title,
    link: select.episode.link,
    target: select.target
  }),
  computed: {
    style() {
      return {
        color: this.color,
        ...this.font
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.episode-title {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
