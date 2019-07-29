<template>
  <div class="link-list">
    <div class="list-item">
      <h1>{{ $t('PODCATCHER') }}</h1>
      <ul>
        <li v-for="(entry, index) in data" :key="index">
          <!-- <b><img :src="`/static/img/${entry.icon}`" />{{ entry.title }}</b> -->
          <span v-if="entry.icon"><icon :type="entry.icon"></icon></span>
          <a
            :href="constructURL(entry)"
            target="_blank"
            @click="onClick(entry, constructURL(entry))"
          >
            {{ entry.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { selectFeed } from 'store/selectors'
import { Icon } from '@podlove/components'

export default {
  components: { Icon },
  props: {
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
    },
    onClick(client, composedUrl) {
      this.$emit('click', client, composedUrl)
    }
  }
}
</script>

<style lang="scss">
@import '~theme/variable';
.link-list {
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - #{$upper-content-height} - #{$footer-content-height} - 10px);
}

.list-item {
  text-align: center;

  ul {
    list-style: none;
    padding-left: 1em;
    text-align: left;

    li {
      padding: 0.5em;
      cursor: pointer;

      &:hover {
        background: rgba($color: #000, $alpha: 0.3);
      }
    }
  }
}
</style>
