<template lang="pug">
  tab-body.tab(:active="active" :name="tab" :aria-selected="active" :ref="tab" v-if="active" :background="body.background" :fixed="fixed")
    slot
</template>

<script>
import { mapState } from 'redux-vuex'
import { Tab } from '@podlove/components'

import select from 'store/selectors'

export default {
  components: {
    TabBody: Tab.Body
  },
  props: {
    tab: {
      type: String,
      default: null
    }
  },
  data: mapState({
    body: select.styles.tabsBody,
    tabs: select.tabs,
    fixed: select.fixed
  }),
  computed: {
    active() {
      return this.tabs[this.tab]
    }
  }
}
</script>
