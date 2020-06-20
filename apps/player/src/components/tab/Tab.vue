<template lang="pug">
  tab-body(:id="`tab-${name}`" :active="active" :name="name" :aria-label="$t(a11y.key, { name })" :aria-selected="active" :ref="name" v-if="active" :background="background" :style="{ color }" data-test="tab" tabindex="1")
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
    color: select.theme.alt,
    a11y: select.accessibility.tabPanel
  }),
  computed: {
    active() {
      return this.tabs[this.name]
    }
  }
}
</script>
