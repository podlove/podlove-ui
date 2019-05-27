<template>
  <div>
    <h1>{{ $t('PLATFORM.TITLE') }}</h1>
    <ul>
      <li v-for="(c, index) in platform_apps" :key="index">
        <!-- <b><img :src="`/static/img/${osx.icon}`" />{{ osx.title }}</b> -->
        <!-- <a :href="`${osx.scheme}https://freakshow.fm/feed/m4a`" target="_blank">{{ osx.title }}</a> -->
        <a :href="`${c.scheme}`" target="_blank">{{ c.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import platform from './clientlist/platform.json'

export default {
  data() {
    return {
      platform_apps: platform.platform
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
