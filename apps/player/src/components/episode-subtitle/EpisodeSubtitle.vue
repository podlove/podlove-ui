<template>
  <div class="episode-subtitle" :style="style" data-test="episode-subtitle">
    {{ state.subtitle }}
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  setup() {
    return {
      state: mapState({
        font: select.theme.fontRegular,
        color: select.theme.contrast,
        subtitle: select.episode.subtitle
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

<style lang="postcss" scoped>
.episode-subtitle {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
