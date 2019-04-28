<template lang="pug">
  wrapper-component
    header-component.header
    controls-component.controls
    progress-bar-component.progress
    tabs-component.tabs
    transition(name="fade")
      error-component.error(v-if="error")
</template>

<script>
import { mapState } from 'redux-vuex'
import selectors from 'store/selectors'

import WrapperComponent from './Wrapper'

import HeaderComponent from './header'
import ControlsComponent from './controls'
import ProgressBarComponent from './progress-bar'
import ErrorComponent from './error'
import TabsComponent from './tabs'

export default {
  components: {
    WrapperComponent,
    HeaderComponent,
    ControlsComponent,
    ProgressBarComponent,
    TabsComponent,
    ErrorComponent
  },
  data: mapState({
    language: selectors.language,
    error: selectors.error.active
  }),
  watch: {
    language() {
      this.$i18n.locale = this.language
    }
  },
  mounted() {
    this.$i18n.locale = this.language
  }
}
</script>

<style lang="scss">
@import '~styles/global';
@import '~styles/variables';
@import '~styles/text';
@import '~styles/marquee';
@import '~styles/utils';
@import '~styles/inputs';

@import '~styles/resets/button';
@import '~styles/resets/input';
@import '~styles/resets/lists';
@import '~styles/resets/range';

@import '~styles/animations';

.header {
  padding: $padding $padding $padding / 2 $padding;
}

.progress {
  margin-top: -1 * $padding;
  padding-bottom: $padding;
}

.controls {
  padding: $padding / 2 0 $padding 0;
}
</style>
