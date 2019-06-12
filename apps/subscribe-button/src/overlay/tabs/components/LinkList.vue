<template>
  <div>
    <div class="app-item">
      <h1>{{ title }}</h1>
      <ul>
        <li v-for="(entry, index) in data" :key="index">
          <!-- <b><img :src="`/static/img/${entry.icon}`" />{{ entry.title }}</b> -->
          <a :href="constructURL(entry)" target="_blank">{{ entry.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { selectFeed } from 'store/selectors'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      ...this.mapState({
        feed: selectFeed
      })
    }
  },
  methods: {
    constructURL(item) {
      const regex = /^https:\/\//gm
      let url = ''
      if (item.https) {
        url = this.feed[0].url
      } else {
        url = this.feed[0].url.replace(regex, '')
      }
      return `${item.scheme}${url}`
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
