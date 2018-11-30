<template lang="pug">
  wrapper
    h1 Hello
</template>

<script>
  import Wrapper from './Wrapper'

  export default {
    components: {
      Wrapper
    }
  }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  @import '~styles/global';
  @import '~styles/variables';
  @import '~styles/text';

  @import '~styles/resets/button';
  @import '~styles/resets/input';
  @import '~styles/resets/lists';
  @import '~styles/resets/range';
</style>
