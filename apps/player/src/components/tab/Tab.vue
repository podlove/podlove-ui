<template lang="pug">
  tab-body(:id="`tab-${name}`" :active="active" :name="name" :aria-selected="active" :ref="name" v-if="active" :background="background" :style="{ color }" data-test="tab")
    div.relative.overflow-hidden
      slot
</template>

<script>
import { mapState } from 'redux-vuex'
import Tab from '@podlove/components/tab'

import select from 'store/selectors'

export default {
  components: {
    TabBody: Tab.Body
  },
  props: {
    name: {
      type: String,
      default: null
    }
  },
  data: mapState({
    background: select.theme.brandDark,
    tabs: select.tabs,
    color: select.theme.alt
  }),
  computed: {
    active() {
      return this.tabs[this.name]
    }
  }
}
</script>
