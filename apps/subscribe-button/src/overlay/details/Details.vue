<template>
  <div class="app-wrapper">
    <div class="app-item">
      <h1>{{ $t('APPS.TITLE') }}</h1>
      <ul>
        <li v-for="(osx, index) in getOSClients" :key="index">
          <!-- <b><img :src="`/static/img/${osx.icon}`" />{{ osx.title }}</b> -->
          <!-- <a :href="`${osx.scheme}https://freakshow.fm/feed/m4a`" target="_blank">{{ osx.title }}</a> -->
          <a :href="`${osx.scheme}`" target="_blank">{{ osx.title }}</a>
        </li>
      </ul>
    </div>
    <div class="app-item">
      <h1>{{ $t('WEB.TITLE') }}</h1>
      <ul>
        <li v-for="(c, index) in web_apps" :key="index">
          <!-- <b><img :src="`/static/img/${osx.icon}`" />{{ osx.title }}</b> -->
          <!-- <a :href="`${osx.scheme}https://freakshow.fm/feed/m4a`" target="_blank">{{ osx.title }}</a> -->
          <a :href="`${c.scheme}`" target="_blank">{{ c.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apps from './clientlist/apps.json'
import web from './clientlist/web.json'
import { getPlatform } from '@podlove/utils/useragent'

export default {
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
  }
}
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.app-item {
  width: 45%;
  text-align: center;

  ul {
    list-style: none;
    padding-left: 0px;

    li {
      padding: 0.5em;
      cursor: pointer;

      &:hover {
        background: rgba($color: #000, $alpha: 0.7);
      }
    }
  }
}
</style>
