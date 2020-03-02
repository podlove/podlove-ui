<template lang="pug">
  divider(:color="color" data-test="divider")
</template>

<script>
import { mapState } from 'redux-vuex'
import Divider from '@podlove/components/divider'
import select from 'store/selectors'

export default {
  components: { Divider },
  data: mapState({
    color: select.theme.shadeBase
  })
}
</script>
