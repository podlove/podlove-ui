<template lang="pug">
  div.absolute.w-full.bottom-0.inset-x-0.pointer-events-none
    div.h-4.mx-4(:style="style")
</template>

<script>
import color from 'color'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    color: select.theme.brandDark
  }),
  computed: {
    style() {
      return {
        'background-image': `linear-gradient(${color(this.color).fade(1)}, ${this.color})`
      }
    }
  }
}
</script>
