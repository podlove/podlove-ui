<template>
  <button class="button" id="play-button" ref="playbutton" @click="clickHandler()">
    <div class="wrapper" :style="wrapper">
      <component :is="type" :color="color" :label="label" :id="`play-button--${type}`" :class="{ 'has-label': label && type !== 'loading' }">
        <span v-if="label" class="label" :style="{ color: color }">{{ label }}</span>
      </component>
    </div>
    <slot></slot>
  </button>
</template>

<script>
import { background, color } from 'defaults'

import Play from './states/Play'
import Pause from './states/Pause'
import Loading from './states/Loading'
import Restart from './states/Restart'

import { requestPlay, requestPause, requestRestart } from '@podlove/actions/play'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['play', 'pause', 'loading', 'restart'].includes(val)
    },
    background: {
      type: String,
      default: background
    },
    color: {
      type: String,
      default: color
    },
    label: {
      type: String
    }
  },
  components: {
    Play, Pause, Loading, Restart
  },
  computed: {
    wrapper () {
      return {
        'background-color': this.background
      }
    }
  },
  methods: {
    clickHandler () {
      switch (this.type) {
        case 'play':
          this.$emit('click', requestPlay())
        break
        case 'pause':
          this.$emit('click', requestPause())
        break
        case 'restart':
          this.$emit('click', requestRestart())
        break
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'resets';
  @import 'font';
  @import 'tokens/animation';
  @import 'tokens/play-button';

  .button {
    @extend %button;

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $button-width;
      min-width: $button-width;
      border-radius: $button-width / 2;
      transition: width $animation-duration * 2;
    }

    .label {
      margin-left: $margin;
      font-size: 1rem;
      font-weight: 200;
      text-transform: uppercase;
      @extend %truncate;
      @extend %font;
    }

    .has-label {
      padding: 0 $padding * 2;
    }
  }
</style>
