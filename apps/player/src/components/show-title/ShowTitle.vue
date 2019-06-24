<template lang="pug">
  h1#show-title(:style="style")
    a(:href="link" :target="target" v-if="link") {{ title }}
    span(v-else) {{ title }}
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
