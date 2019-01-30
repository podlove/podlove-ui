<template lang="pug">
  wrapper-component
    header-component.header
    controls-component.controls
    progress-bar-component.progress
</template>

<script>
  import { mapState } from 'redux-vuex'
  import selectors from 'store/selectors'

  import WrapperComponent from './Wrapper'
  import HeaderComponent from './header'
  import ControlsComponent from './controls'
  import ProgressBarComponent from './progress-bar'

  export default {
    data: mapState({
      language: selectors.language
    }),
    components: {
      WrapperComponent,
      HeaderComponent,
      ControlsComponent,
      ProgressBarComponent
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

  @import '~styles/animations';

  .header {
    padding: $padding $padding $padding / 2 $padding;
  }

  .controls {
    padding: $padding / 2 0 0 0;
  }
</style>
