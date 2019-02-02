<template lang="pug">
  p.link-container
    icon.icon(type="link")
    a.link(:href="link" target="_blank") {{ hostname(link) }}
</template>

<script>
import { Icon } from '@podlove/components'
import { hostname } from '@podlove/utils/url'

export default {
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  methods: {
    hostname
  },
  components: { Icon }
}
</script>

<style lang="scss" scoped>
  .link-container {
    display: flex;
    align-items: center;
  }

  .link {
    font-weight: 700;
  }

  .icon {
    margin-right: $margin / 2;
  }
</style>
