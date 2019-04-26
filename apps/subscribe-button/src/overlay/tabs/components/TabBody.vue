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
import { Tab } from '@podlove/components'
export default {
  components: {
    TabBody: Tab.Body
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tab: {
      type: String,
      default: null
    }
  }
}
</script>
