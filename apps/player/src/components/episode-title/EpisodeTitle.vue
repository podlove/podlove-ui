<template lang="pug">
  h1#episode-title.episode-title(:style="style")
    a(:href="link" :target="target" v-if="link") {{ title }}
    span(v-else) {{ title }}
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
