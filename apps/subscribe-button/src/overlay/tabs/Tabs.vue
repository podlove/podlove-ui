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
      <tab-header-item tab="info" :title="$t('INFO.TITLE')" :active="true"></tab-header-item>
    </tab-header>
    <tab-body tab="apps" :active="false">
      <div>something</div>
    </tab-body>
    <tab-body tab="cloud" :active="false">
      <div>something</div>
    </tab-body>
    <tab-body tab="platform" :active="false">
      <div>
        something
        <h1>hello</h1>
      </div>
    </tab-body>
    <tab-body tab="info" :active="true">
      <info-tab></info-tab>
    </tab-body>
  </div>
</template>

<script>
import { Tab } from '@podlove/components'

import TabHeaderItem from './components/TabHeaderItem'
import TabBody from './components/TabBody'
import InfoTab from '../info/'

// const tabs = {
//   InfoTab: () =>
//     import(/* webpackChunkName: "info-tab" */
//     /* webpackMode: "lazy" */
//     /* webpackPreload: true */
//     '../info')
// }

export default {
  components: {
    InfoTab,
    TabBody,
    TabHeader: Tab.Header,
    TabHeaderItem
    // ...tabs
  }
}
</script>
