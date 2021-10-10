<template>
  <divider :color="state.color" data-test="divider" />
</template>

<script>
import { mapState } from 'redux-vuex'
import Divider from '@podlove/components/divider'
import select from 'store/selectors'

export default {
  components: { Divider },
  setup() {
    return {
      state: mapState({
        color: select.theme.shadeBase
      })
    }
  }
}
</script>
