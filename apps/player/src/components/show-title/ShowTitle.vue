<template>
  <h1 :style="style" data-test="show-title">
    <a v-if="state.link" :href="state.link" :target="state.target" data-test="show-title--link">{{
      state.title
    }}</a>
    <span v-else data-test="show-title--text">{{ state.title }}</span>
  </h1>
</template>

<script>
import { mapState } from 'redux-vuex'
import select from '../../store/selectors'

export default {
  setup() {
    return {
      state: mapState({
        font: select.theme.fontBold,
        color: select.theme.brand,
        title: select.show.title,
        link: select.show.link,
        target: select.target
      })
    }
  },
  computed: {
    style() {
      return {
        color: this.state.color,
        ...this.state.font
      }
    }
  }
}
</script>
