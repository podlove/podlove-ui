<template lang="pug">
  div.error#error
    div.error-wrapper
      div.error-header(:style="wrapperStyle")
        div.error-icon(v-if="icon")
          icon(:type="icon", :size="40")
        h3.error-title(v-if="title") {{ $t(title) }}
      div.error-details
        p.error-message(v-if="message") {{ $t(message) }}
        div.error-action
          action-button(v-if="retry" @click.native="retryAction")
            span.error-action-label {{ $t('PLAYER.RETRY') }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { Icon, Button } from '@podlove/components'

import buttonColor from 'directives/button-color'
import store from 'store'
import select from 'store/selectors'

export default {
  components: {
    Icon,
    ActionButton: buttonColor(Button)
  },
  data: mapState({
    icon: select.error.icon,
    title: select.error.title,
    message: select.error.message,
    retry: select.error.retry,
    style: select.styles.error
  }),
  computed: {
    wrapperStyle() {
      return {
        background: this.style.background,
        color: this.style.color
      }
    }
  },
  methods: {
    retryAction() {
      this.retry && store.dispatch({ type: this.retry })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/variables';

.error {
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  overflow: hidden;
  padding: $margin * 2;
  display: flex;
  height: 100%;
  justify-content: center;
  background-color: $backdrop-color;

  .error-wrapper {
    display: flex;
  }

  .error-icon {
    margin-bottom: $margin;
  }

  .error-title {
    font-weight: 500;
    font-size: 1.2em;
    margin: 0;
    text-align: center;
  }

  .error-header {
    padding: $padding * 2;
    max-width: $width-xs;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .error-details {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: $padding;
    width: $width-xs;
    background: $background-color;
    color: rgba($accent-color, 0.8);
  }

  .error-action {
    display: flex;
    justify-content: center;
  }

  .error-action-label {
    padding: 0 $padding;
  }

  @media screen and (max-width: $width-m) {
    .error-wrapper {
      display: block;
    }
  }
}
</style>
