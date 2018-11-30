<template lang="pug">
  div.wrapper(:class="{[display]: display}", :style="{ background: 'black' }")
    slot
</template>

<script>
  import { mapState } from 'redux-vuex'
  import select from 'store/selectors'

  export default {
    data: mapState({
      display: select.display
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
  }
</style>
