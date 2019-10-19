<template lang="pug">
  h1(:style="style" data-test="show-title")
    a(:href="link" :target="target" v-if="link" data-test="show-title--link") {{ title }}
    span(v-else data-test="show-title--text") {{ title }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    font: select.theme.fontBold,
    color: select.theme.brand,
    title: select.show.title,
    link: select.show.link,
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
