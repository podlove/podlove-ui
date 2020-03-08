<template lang="pug">
  div.mb-6(data-test="tab-title")
    div.flex.justify-between
      h1.text-xl.mb-4(:style="font")
        slot
      button.h-6.mt-1(@click="close" data-test="tab-title--close")
        icon(type="close")
    div.border-dotted.border-b-2.border-gray-400.w-full
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'
import Icon from '@podlove/components/icons'

export default {
  components: { Icon },
  data: mapState({
    font: select.theme.fontCi
  }),
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
