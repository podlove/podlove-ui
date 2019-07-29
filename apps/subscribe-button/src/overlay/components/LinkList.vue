<template>
  <div class="link-list">
    <div class="list-item">
      <h1>{{ $t('PODCATCHER') }}</h1>
      <ul>
        <li v-for="(entry, index) in data" :key="index">
          <icon v-if="entry.icon" :type="entry.icon"></icon>
          <a
            :href="constructURL(entry)"
            target="_blank"
            @click="onClick(entry, constructURL(entry))"
          >
            {{ entry.title }}
          </a>
          <icon type="link-arrow"></icon>
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
    padding: 0 2em;
    text-align: left;

    li {
      padding: 0.5em;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background: rgba($color: #000, $alpha: 0.3);
      }

      a {
        margin: 0 0.5em 0 1em;
      }
    }
  }
}
</style>
