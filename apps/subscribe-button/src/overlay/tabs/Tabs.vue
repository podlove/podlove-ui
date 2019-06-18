<template>
  <div class="tabs">
    <tab-header class="overflows">
      <tab-header-item tab="apps" :title="$t('APPS.TITLE')"></tab-header-item>
      <tab-header-item tab="web" :title="$t('WEB.TITLE')"></tab-header-item>
      <tab-header-item tab="info" :title="$t('INFO.TITLE')"></tab-header-item>
    </tab-header>
    <tab-body tab="apps">
      <link-list
        v-if="!finishScreenVisible"
        :title="$t('APPS.TITLE')"
        :data="getOSClients"
        @click="showLastScreen"
      >
      </link-list>
      <finish-screen v-else @click="hideLastScreen"></finish-screen>
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
import { Tab } from '@podlove/components'

import TabHeaderItem from './components/TabHeaderItem'
import TabBody from './components/TabBody'
import LinkList from './components/LinkList'
import FinishScreen from './components/FinishScreen'

import apps from './clientlist/apps.json'
import web from './clientlist/web.json'

import { getPlatform } from '@podlove/utils/useragent'

import store from 'store'

import { selectFinishScreenVisible, selectFinishScreenObject } from 'store/selectors'

import {
  closeFinishScreen,
  showFinishScreen,
  fillFinishObject,
  resetFinishObject
} from 'store/actions'

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
    FinishScreen,
    ...tabs
  },
  data() {
    return {
      ...this.mapState({
        finishScreenVisible: selectFinishScreenVisible,
        finishObject: selectFinishScreenObject
      }),
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
    hideLastScreen() {
      store.dispatch(closeFinishScreen())
      store.dispatch(resetFinishObject())
    },
    showLastScreen(client, composedUrl) {
      store.dispatch(showFinishScreen())
      store.dispatch(
        fillFinishObject({
          finish_object: {
            ...client,
            ...{ composedUrl: composedUrl }
          }
        })
      )
    }
  }
}
</script>

<style lang="scss">
.tabs {
  width: 100%;
}
</style>
