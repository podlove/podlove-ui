<template lang="pug">
  wrapper-component
    header-component.header
    controls-component.controls
</template>

<script>
  import { mapState } from 'redux-vuex'
  import selectors from 'store/selectors'

  import WrapperComponent from './Wrapper'
  import HeaderComponent from './header'
  import ControlsComponent from './controls'

  export default {
    data: mapState({
      language: selectors.language
    }),
    components: {
      WrapperComponent,
      HeaderComponent,
      ControlsComponent
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
  @import '~styles/global';
  @import '~styles/variables';
  @import '~styles/text';
  @import '~styles/marquee';

  @import '~styles/resets/button';
  @import '~styles/resets/input';
  @import '~styles/resets/lists';
  @import '~styles/resets/range';

  .header {
    padding: $padding $padding $padding / 2 $padding;
  }

  .controls {
    padding: $padding / 2 0;
  }
</style>
