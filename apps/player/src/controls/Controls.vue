<template lang="pug">
  div.control-bar(:style="controlbarStyle")
    transition(name="entry")
      chapter-button.control-button(v-if="chapterButtons" type="previous" :color="buttonStyle.background" @click="dispatch")
    transition(name="entry")
      stepper-button.control-button(v-if="stepperButtons" type="backwards" :color="buttonStyle.background" @click="dispatch")
    transition(name="entry")
      play-button.control-button(v-if="button.type" :type="button.type" :color="buttonStyle.color" :background="buttonStyle.background" @click="dispatch" :label="button.label")
        span.visually-hidden {{ button.a11y }}
    transition(name="entry")
      stepper-button.control-button(v-if="stepperButtons" type="forward" :color="buttonStyle.background" @click="dispatch")
    transition(name="entry")
      chapter-button.control-button(v-if="chapterButtons" type="next" :color="buttonStyle.background" @click="dispatch")
</template>

<script>
import { mapState } from 'redux-vuex'
import { calcHours, calcMinutes, calcSeconds, toHumanTime } from '@podlove/utils/time'
import store from 'store'

import select from 'store/selectors'
import { PlayButton, ChapterButton, StepperButton } from '@podlove/components'

export default {
  data: mapState({
    controlbarStyle: select.styles.controls,
    buttonStyle: select.styles.buttonInverted,
    playButton: select.components.playButton,
    stepperButtons: select.components.stepperButtons,
    chapterButtons: select.components.chapterButtons,
    duration: select.duration,
    playtime: select.playtime
  }),
  components: {
    PlayButton,
    ChapterButton,
    StepperButton
  },
  methods: {
    dispatch: store.dispatch
  },
  computed: {
    button () {
      switch (this.playButton) {
        case 'paused':
          return {
            type: 'play',
            a11y: this.$t('A11Y.PLAYER_PAUSE')
          }
        case 'duration':
          return {
            type: 'play',
            a11y: this.$t('A11Y.PLAYER_START', {
              hours: calcHours(this.playtime > 0 ? this.playtime : this.duration),
              minutes: calcMinutes(this.playtime > 0 ? this.playtime : this.duration),
              seconds: calcSeconds(this.playtime > 0 ? this.playtime : this.duration)
            }),
            label: toHumanTime(this.playtime > 0 ? this.playtime : this.duration)
          }
        case 'remaining':
          return {
            type: 'play',
            label: toHumanTime(this.playtime)
          }
        case 'replay':
          return {
            type: 'restart',
            a11y: this.$t('A11Y.PLAYER_LOADING'),
            label: this.$t('PLAYER.REPLAY')
          }
        case 'loading':
          return {
            type: 'loading'
          }
        case 'playing':
          return {
            type: 'pause',
            a11y: this.$t('A11Y.PLAYER_PLAY')
          }
        case 'error':
          return {
            type: 'restart',
            a11y: this.$t('A11Y.PLAYER_ERROR')
          }
        case 'retry':
          return {
            type: 'restart',
            label: this.$t('PLAYER.RETRY')
          }
        case 'end':
          return {
            type: 'restart'
          }
      }
    }
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
      display: block;
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
