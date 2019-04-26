<template>
  <div class="tabs">
    <tab-header class="overflows">
      <tab-header-item title="tab 0" :active="true"></tab-header-item>
      <tab-header-item title="tab 1" :active="false"></tab-header-item>
      <tab-header-item title="tab 2" :active="false"></tab-header-item>
      <tab-header-item title="tab 3" :active="false"></tab-header-item>
    </tab-header>
  </div>
</template>

<script>
import { Tab } from '@podlove/components'

import TabHeaderItem from './components/TabHeaderItem'
export default {
  components: {
    TabHeader: Tab.Header,
    TabHeaderItem
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;

  .overflows .tab-header-item >>> .title {
    display: none;
  }
}
</style>
