<template>
  <tab-body
    v-if="active"
    :id="`tab-${name}`"
    :ref="name"
    :active="active"
    :name="name"
    :aria-label="$t(state.a11y.key, { name })"
    :aria-selected="active"
    :background="state.background"
    :style="{ color: state.color }"
    data-test="tab"
    tabindex="1"
  >
    <div class="relative overflow-hidden">
      <slot />
    </div>
  </tab-body>
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
  setup() {
    return {
      state: mapState({
        background: select.theme.brandDark,
        tabs: select.tabs,
        color: select.theme.alt,
        a11y: select.accessibility.tabPanel
      })
    }
  },
  computed: {
    active() {
      return this.state.tabs[this.name]
    }
  }
}
</script>
