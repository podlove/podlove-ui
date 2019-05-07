<template>
  <div class="tabs">
    <tab-header class="overflows">
      <tab-header-item tab="apps" :title="$t('APPS.TITLE')"></tab-header-item>
      <tab-header-item tab="cloud" :title="$t('CLOUD.TITLE')"></tab-header-item>
      <tab-header-item tab="platform" :title="$t('PLATFORM.TITLE')"></tab-header-item>
      <tab-header-item tab="info" :title="$t('INFO.TITLE')"></tab-header-item>
    </tab-header>
    <tab-body tab="apps">
      <apps-tab></apps-tab>
    </tab-body>
    <tab-body tab="cloud">
      <cloud-tab></cloud-tab>
    </tab-body>
    <tab-body tab="platform">
      <div>
        something
        <h1>hello</h1>
      </div>
    </tab-body>
    <tab-body tab="info">
      <info-tab></info-tab>
    </tab-body>
  </div>
</template>

<script>
import { compose } from 'ramda'
import { Tab } from '@podlove/components'

import TabHeaderItem from './components/TabHeaderItem'
import TabBody from './components/TabBody'

import { TOGGLE_TAB } from 'store/reducers/types'
import store from 'store'

const tabs = {
  AppsTab: () =>
    import(
      /* webpackChunkName: "info-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../clients/Apps'
    ),
  CloudTab: () =>
    import(
      /* webpackChunkName: "info-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../clients/Cloud'
    ),
  InfoTab: () =>
    import(
      /* webpackChunkName: "info-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../info'
    )
}

export default {
  components: {
    TabBody,
    TabHeader: Tab.Header,
    TabHeaderItem,
    ...tabs
  },
  methods: {
    toggleTab: compose(
      store.dispatch,
      TOGGLE_TAB
    )
  }
}
</script>
