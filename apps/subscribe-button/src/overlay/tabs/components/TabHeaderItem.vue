<template>
  <tab-header-item :name="tab" :active="active">
    <span>
      {{ title }}
    </span>
  </tab-header-item>
  <!-- tab-header-item(
    :name="tab"
    @click="toggleTab(tab)"
    :color="header.color"
    :colorActive="header.colorActive"
    :background="header.background"
    :backgroundActive="header.backgroundActive"
    :active="active"
  )
    slot(name="icon" slot="icon")
    span(slot="title") {{ title }} -->
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
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
