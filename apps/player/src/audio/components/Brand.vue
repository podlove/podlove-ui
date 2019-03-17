<template lang="pug">
  div.footer
    a.version(title="Podlove" href="//podlove.org" target="_blank")
      icon.icon(type="podlove-player")
      span.link-text(v-if="version") Podlove Web Player v{{version}}
</template>

<script>
import { mapState } from 'redux-vuex'
import { Icon } from '@podlove/components'

import select from 'store/selectors'

export default {
  data: mapState({
    version: select.version
  }),
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.footer {
  margin: $margin;
  display: flex;

  .version {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    margin-left: auto;
    color: rgba($accent-color, 0.75);
  }

  .icon {
    margin-right: $margin / 2;
  }
}
</style>
