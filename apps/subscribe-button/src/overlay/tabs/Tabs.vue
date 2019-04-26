<template>
  <div class="tabs">
    <tab-header class="overflows">
      <tab-header-item tab="apps" :title="$t('APPS.TITLE')" :active="false"></tab-header-item>
      <tab-header-item tab="cloud" :title="$t('CLOUD.TITLE')" :active="false"></tab-header-item>
      <tab-header-item
        tab="platform"
        :title="$t('PLATFORM.TITLE')"
        :active="false"
      ></tab-header-item>
      <tab-header-item tab="info" :title="$t('INFO.TITLE')" :active="false"></tab-header-item>
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
