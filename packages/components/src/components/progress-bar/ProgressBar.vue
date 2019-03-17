<template>
  <div class="progress" id="progress-bar">
    <input
      v-if="isMobile"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      @change="onChange"
      @input="onInput"
      :title="title"
    />
    <input
      v-else
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      @change="onChange"
      @input="onInput"
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
      :title="title"
    />
    <span class="progress-range" :style="rangeStyle"></span>
    <span
      class="progress-buffer"
      v-for="(buffering, index) in buffer"
      :style="bufferStyle(buffering)"
      :key="`buffer-${index}`"
    ></span>
    <span
      v-for="(quantile, index) in quantiles"
      class="progress-track"
      :style="trackStyle(quantile)"
      :key="`track-${index}`"
    ></span>
    <div class="chapters-progress">
      <span class="indicator" v-for="(chapter, index) in chapters" :key="index" :style="chapterStyle(chapter)"></span>
    </div>
    <span class="ghost-thumb" :style="ghostStyle"></span>
    <span class="progress-thumb" :class="{ active: thumbActive }" :style="thumbStyle"></span>
  </div>
</template>

<script>
import color from 'color'
import { mapActions } from 'redux-vuex'
import { interpolate, relativePosition } from '@podlove/utils/math'
import { isNegative, light, dark } from '@podlove/utils/color'
import { isMobile } from '@podlove/utils/detect'
import { requestPlaytime, simulatePlaytime } from '@podlove/player-actions/timepiece'
import { enableGhost, disableGhost } from '@podlove/player-actions/progress'

import { color as defaultColor, background as defaultBackground, highlight as defaultHighlight } from 'defaults'

export default {
  props: {
    time: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    ghost: {
      type: Number,
      default: null
    },
    buffer: {
      type: Array,
      default: () => []
    },
    quantiles: {
      type: Array,
      default: () => []
    },
    progressColor: {
      type: String,
      default: defaultColor
    },
    thumbColor: {
      type: String,
      default: defaultColor
    },
    highlightColor: {
      type: String,
      default: defaultHighlight
    },
    title: {
      type: String
    },
    chapters: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      thumbActive: false,
      isMobile
    }
  },
  computed: {
    rangeStyle () {
      return {
        'background-color': this.progressColor
      }
    },

    thumbStyle () {
      return {
        display: 'block',
        left: relativePosition(this.time, this.duration),
        'background-color': this.thumbColor,
        'border-color': this.highlightColor
      }
    },

    ghostStyle () {
      return {
        display: !!this.ghost ? 'block' : 'none',
        left: relativePosition(this.ghost, this.duration),
        'background-color': color(this.thumbColor).fade(0.2),
        'border-color': this.highlightColor
      }
    }
  },
  methods: {
    ...mapActions({
      onChange: function ({ actions, dispatch }, event) {
        this.$emit('input', requestPlaytime(event.target.value))
      },

      onInput: function ({ actions, dispatch }, event) {
        this.thumbAnimated = false
        this.$emit('input', requestPlaytime(event.target.value))
        this.$emit('ghost', disableGhost())
      },

      onMouseMove: function ({ actions, dispatch }, event) {
        if (
          (event.offsetY < 13 && event.offsetY > 31) ||
          event.offsetX < 0 ||
          event.offsetX > event.target.clientWidth
        ) {
          this.thumbActive = false
          this.$emit('ghost', disableGhost())
          return false
        }

        this.thumbAnimated = true
        this.thumbActive = true

        this.$emit('simulate', simulatePlaytime((this.duration * event.offsetX) / event.target.clientWidth))
        this.$emit('ghost', enableGhost())

        return false
      },

      onMouseOut: function ({ actions, dispatch }, event) {
        this.thumbActive = false

        this.$emit('ghost', disableGhost())
        this.$emit('simulate', simulatePlaytime(this.time))

        return false
      }
    }),

    trackStyle ([start, end]) {
      return {
        left: relativePosition(start, this.duration),
        width: relativePosition(end - start, this.duration),
        'background-color': this.thumbColor
      }
    },

    bufferStyle ([start, end]) {
      return {
        left: relativePosition(start, this.duration),
        width: relativePosition(end - start, this.duration),
        'background-color': isNegative(this.progressColor) ? color(light).fade(0.5) : color(dark).fade(0.7)
      }
    },

    isLast (index) {
      return this.chapters.length - 1 === index
    },

    chapterStyle (chapter) {
      return {
        left: (chapter.end * 100) / this.duration + '%',
        background: this.highlightColor
      }
    },

    interpolate
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'resets';
@import 'tokens/progress';
@import 'tokens/animation';
@import 'tokens/color';

.progress {
  @include range($height, $thumb-width-desktop, $thumb-width-desktop-hover);

  width: 100%;
  position: relative;
  height: $height;
  transition: opacity ($animation-duration / 2), height $animation-duration;
  cursor: pointer;
}

.progress-range {
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
  background-color: rgba($accent-color, 0.25);
  pointer-events: none;
}

.progress-track {
  display: block;
  position: absolute;
  left: 0;
  top: calc(50% - #{$track-height / 2});
  height: $track-height;
  pointer-events: none;
}

.progress-thumb {
  position: absolute;
  border: 1px solid;
  // border offset
  margin-left: -2px;
  height: $thumb-height;
  top: calc(50% - #{$thumb-height / 2});
  width: $thumb-width;
  pointer-events: none;

  transition: left $animation-duration / 2;

  &.active {
    width: $thumb-active-width;
    height: $thumb-active-height;
    top: calc(50% - #{$thumb-active-height / 2});
  }
}

.ghost-thumb {
  display: none;
  position: absolute;
  border: 1px solid transparent;
  opacity: 0.8;
  margin-left: -2px;
  height: $thumb-height;
  top: calc(50% - #{$thumb-height / 2});
  width: $thumb-width;
  pointer-events: none;
}

.progress-buffer {
  display: block;
  opacity: 1;
  position: absolute;
  height: $track-height;
  top: calc(50% - #{$track-height / 2});
  left: 0;
  pointer-events: none;
}

.chapters-progress {
  .indicator {
    position: absolute;
    width: 2px;
    height: 2px;
    top: calc(50% - 1px);
    pointer-events: none;
  }
}
</style>
