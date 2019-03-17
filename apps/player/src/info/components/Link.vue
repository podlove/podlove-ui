<template lang="pug">
  p.link-container
    icon.icon(type="link")
    a.link(:href="link" target="_blank") {{ hostname(link) }}{{ pathname(link) }}
</template>

<script>
import { Icon } from '@podlove/components'
import { hostname, pathname } from '@podlove/utils/url'

export default {
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  methods: {
    hostname,
    pathname
  },
  components: { Icon }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

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
