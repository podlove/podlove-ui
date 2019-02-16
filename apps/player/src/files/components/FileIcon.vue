<template lang="pug">
  icon.file-icon(:type="type" :color="color" :background="background" :size="32")
</template>

<script>
import { Icon } from '@podlove/components'
import { mapState } from 'redux-vuex'

import select from 'store/selectors'

export default {
  props: {
    type: {
      type: String
    }
  },
  components: {
    Icon
  },
  data: mapState({
    background: select.styles.iconColor,
    color: select.styles.iconBackground
  })
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .file-icon {
    display: block;
    width: $files-icon-width;
    height: $files-icon-width;
  }

  @media screen and (max-width: $width-m) {
    .file-icon {
      display: none;
    }
  }
</style>
