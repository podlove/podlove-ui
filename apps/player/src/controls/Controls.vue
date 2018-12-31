<template lang="pug">
  div.control-bar(:style="controlbarStyle")
    chapter-button.control-button(type="previous" :color="buttonStyle.background" @click="dispatch")
    stepper-button.control-button(type="backwards" :color="buttonStyle.background" @click="dispatch")
    play-button.control-button(type="play" :color="buttonStyle.color" :background="buttonStyle.background" @click="dispatch")
    stepper-button.control-button(type="forward" :color="buttonStyle.background" @click="dispatch")
    chapter-button.control-button(type="next" :color="buttonStyle.background" @click="dispatch")
</template>

<script>
import { mapState } from 'redux-vuex'
import store from 'store'

import select from 'store/selectors'
import { PlayButton, ChapterButton, StepperButton } from '@podlove/components'

export default {
  data: mapState({
    controlbarStyle: select.styles.controls,
    buttonStyle: select.styles.button
  }),
  components: {
    PlayButton,
    ChapterButton,
    StepperButton
  },
  methods: {
    dispatch: store.dispatch
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .control-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .control-button {
      margin: 0 $margin;
      opacity: 1;

      &:hover {
        opacity: 0.8;
      }
    }

    @media screen and (max-width: $width-s) {
      .control-button {
        margin: 0 ($margin / 2);
      }
    }
  }

  .player-control {
    margin: 0 ($margin / 1.5);
  }

  @media screen and (max-width: $width-xs) {
    .chapter-control {
      display: none;
    }
  }
</style>
