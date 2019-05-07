<template>
  <div>
    <h1>{{ $t('CLOUD.TITLE') }}</h1>
    <ul>
      <li v-for="(c, index) in cloud_apps" :key="index">
        <!-- <b><img :src="`/static/img/${osx.icon}`" />{{ osx.title }}</b> -->
        <!-- <a :href="`${osx.scheme}https://freakshow.fm/feed/m4a`" target="_blank">{{ osx.title }}</a> -->
        <a :href="`${c.scheme}`" target="_blank">{{ c.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import cloud from './clientlist/cloud.json'

export default {
  data() {
    return {
      cloud_apps: cloud.cloud
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
