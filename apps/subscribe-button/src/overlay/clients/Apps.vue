<template>
  <div>
    <h1>{{ $t('APPS.TITLE') }}</h1>
    <p>{{ getOS }}</p>
    <ul>
      <li v-for="(osx, index) in getOSClients" :key="index">
        <!-- <b><img :src="`/static/img/${osx.icon}`" />{{ osx.title }}</b> -->
        <!-- <a :href="`${osx.scheme}https://freakshow.fm/feed/m4a`" target="_blank">{{ osx.title }}</a> -->
        <a :href="`${osx.scheme}`" target="_blank">{{ osx.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import apps from './clientlist/apps.json'
import { getPlattform } from '@podlove/utils/useragent'

export default {
  data() {
    return {
      plat: getPlattform(),
      client: window.navigator.platform
    }
  },
  computed: {
    getOS() {
      return window.navigator.platform
    },
    getOSClients() {
      return apps[this.plat]
    }
  }
}
</script>

<style lang="scss">
ul {
  list-style: none;
  padding-left: 0px;

  li {
    padding: 0.5em;
    cursor: pointer;

    &:hover {
      background: rgba($color: #fff, $alpha: 0.7);
    }
  }
}
</style>
