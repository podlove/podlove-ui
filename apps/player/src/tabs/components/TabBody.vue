<template lang="pug">
  tab-body(:active="active" :name="tab" :aria-selected="active" :ref="tab" v-if="active" :background="body.background")
    slot
</template>

<script>
import { mapState } from 'redux-vuex'
import { Tab } from '@podlove/components'

import select from 'store/selectors'

export default {
  props: {
    tab: {
      type: String
    }
  },
  data: mapState({
    body: select.styles.tabsBody,
    tabs: select.tabs
  }),
  computed: {
    active() {
      return this.tabs[this.tab]
    }
  },
  components: {
    TabBody: Tab.Body
  }
}
</script>

<style>

</style>
