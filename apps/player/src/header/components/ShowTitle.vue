<template lang="pug">
  h2.show-title#header-showtitle(:style="style" v-if="title")
    a.truncate(v-if="link") {{ title }}
    span.truncate(v-else) {{ title }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    style: select.styles.title,
    title: select.show.title,
    link: select.show.link
  })
}
</script>

<style lang="scss">
.show-title {
  margin: 0;
  font-weight: inherit;
  font-size: 1em;
  line-height: 1.2em;
  min-width: 0;

  a,
  span {
    display: block;
  }
}
</style>
