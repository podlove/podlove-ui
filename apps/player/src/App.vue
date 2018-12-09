<template lang="pug">
  wrapper-component
    header-component
</template>

<script>
  import { mapState } from 'redux-vuex'
  import selectors from 'store/selectors'

  import WrapperComponent from './Wrapper'
  import HeaderComponent from './header'

  export default {
    data: mapState({
      language: selectors.language
    }),
    components: {
      WrapperComponent,
      HeaderComponent
    },
    watch: {
      language () {
        this.$i18n.locale = this.language
      }
    },
    mounted () {
      this.$i18n.locale = this.language
    }
  }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  @import '~styles/global';
  @import '~styles/variables';
  @import '~styles/text';
  @import '~styles/marquee';

  @import '~styles/resets/button';
  @import '~styles/resets/input';
  @import '~styles/resets/lists';
  @import '~styles/resets/range';
</style>
