<template>
  <tab-body
    v-if="active"
    :ref="tab"
    class="tab"
    :active="active"
    :name="tab"
    :aria-selected="active"
  >
    <slot></slot>
  </tab-body>
</template>

<script>
import { mapState } from 'redux-vuex'

import { Tab } from '@podlove/components'

import { tabs } from 'store/selectors'

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
    tabs: tabs
  }),
  computed: {
    active() {
      return this.tabs[this.tab]
    }
  }
}
</script>
<style lang="scss">
.tab-content {
  overflow: auto;
  padding: 0 1.5em 1em 1.5em;
}
</style>
