<template>
  <div class="absolute w-full bottom-0 inset-x-0 pointer-events-none" data-test="tab-overflow">
    <div class="h-4.mx-4" :style="style" data-test="tab-overflow--shadow"></div>
  </div>
</template>

<script>
import color from 'color'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  setup() {
    return {
      state: mapState({
        color: select.theme.brandDark
      })
    }
  },
  computed: {
    style() {
      return {
        'background-image': `linear-gradient(${color(this.state.color).fade(1)}, ${
          this.state.color
        })`
      }
    }
  }
}
</script>
