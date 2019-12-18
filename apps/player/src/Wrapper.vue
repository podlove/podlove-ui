<template lang="pug">
  div.wrapper(:class="{[display]: display, [platform]: platform}", :style="style")
    slot
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    display: select.display,
    platform: select.platform,
    style: select.styles.wrapper
  })
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';
@import '~styles/utils';
@import '~styles/font';

.wrapper {
  display: block;
  position: relative;
  width: 100%;
  max-width: $width-xl;
  min-width: $width-xs;

  @include font();
  font-size: 14px;
}
</style>
