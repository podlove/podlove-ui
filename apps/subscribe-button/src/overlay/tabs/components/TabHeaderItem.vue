<template>
  <tab-header-item :name="tab" :active="active">
    <span slot="title">
      {{ title }}
    </span>
  </tab-header-item>
</template>

<script>
import { Tab } from '@podlove/components'
export default {
  components: {
    TabHeaderItem: Tab.HeaderItem
  },
  props: {
    title: {
      type: String,
      default: null
    },
    tab: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
