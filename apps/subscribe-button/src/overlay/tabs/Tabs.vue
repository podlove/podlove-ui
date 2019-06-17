<template>
  <div class="tabs">
    <tab-header class="overflows">
      <tab-header-item tab="apps" :title="$t('APPS.TITLE')"></tab-header-item>
      <tab-header-item tab="web" :title="$t('WEB.TITLE')"></tab-header-item>
      <tab-header-item tab="info" :title="$t('INFO.TITLE')"></tab-header-item>
    </tab-header>
    <tab-body tab="apps">
      <link-list :title="$t('APPS.TITLE')" :data="getOSClients"></link-list>
    </tab-body>
    <tab-body tab="web">
      <link-list :title="$t('WEB.TITLE')" :data="web_apps"></link-list>
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
import LinkList from './components/LinkList'

import apps from './clientlist/apps.json'
import web from './clientlist/web.json'

import { getPlatform } from '@podlove/utils/useragent'

import { TOGGLE_TAB } from 'store/reducers/types'
import store from 'store'

const tabs = {
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
    LinkList,
    ...tabs
  },
  data() {
    return {
      plat: getPlatform(),
      client: window.navigator.platform,
      web_apps: [...web.cloud, ...web.platform]
    }
  },
  computed: {
    getOSClients() {
      return apps[this.plat]
    }
  },
  methods: {
    toggleTab: compose(
      store.dispatch,
      TOGGLE_TAB
    )
  }
}
</script>

<style lang="scss">
.tabs {
  width: 100%;
}
</style>
