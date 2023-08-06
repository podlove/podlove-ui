<template>
  <div class="podlove-component--progress-bar w-full relative cursor-pointer">
    <input
      v-if="isMobile"
      ref="inputElement"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      tabindex="-1"
      aria-hidden="true"
      @change="onChange(extractValue($event))"
      @input="onInput(extractValue($event))"
    />
    <input
      v-else
      ref="inputElement"
      type="range"
      min="0"
      :max="interpolate(duration)"
      :value="interpolate(time)"
      tabindex="-1"
      aria-hidden="true"
      @change="onChange(extractValue($event))"
      @input="onInput(extractValue($event))"
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
    />
    <span class="progress-range block absolute w-full left-0 pointer-events-none" />
    <span
      v-for="(buffering, index) in buffer"
      :key="`buffer-${index}`"
      tabindex="-1"
      aria-hidden="true"
      class="progress-buffer"
      :style="bufferStyle(buffering)"
    />
    <span
      v-for="(quantile, index) in quantiles"
      :key="`track-${index}`"
      tabindex="-1"
      aria-hidden="true"
      class="progress-track block absolute left-0 pointer-events-none"
      :style="trackStyle(quantile)"
    />
    <div>
      <span
        v-for="(chapter, index) in chapters"
        :key="index"
        tabindex="-1"
        aria-hidden="true"
        data-test="progress-bar--chapter-progress--indicator"
        class="chapters-progress absolute pointer-events-none"
        :class="{
          active: chapter.start <= ghost && chapter.end >= ghost
        }"
        :style="chapterStyle(chapter)"
      />
    </div>
    <span
      class="ghost-thumb absolute border-transparent border bg-opacity-75 pointer-events-none"
      :class="{
        hidden: !ghost,
        block: ghost
      }"
      aria-hidden="true"
      :style="ghostStyle"
    />
    <span
      class="progress-thumb absolute block border border-solid pointer-events-none"
      tabindex="-1"
      aria-hidden="true"
      :class="{ active: thumbActive }"
      :style="thumbStyle"
    />
    <input
      type="range"
      class="sr-only"
      :title="title"
      min="0"
      max="100"
      steps="1"
      :value="(time / duration) * 100"
      @change="onChange((extractValue($event) / 100) * duration)"
      @input="onInput((extractValue($event) / 100) * duration)"
    />
  </div>
</template>

<script lang="ts" setup>
import RangeTouch from 'rangetouch';

import { interpolate, relativePosition } from '@podlove/utils/math';
import { isMobile } from '@podlove/utils/detect';
import { requestPlaytime, simulatePlaytime } from '@podlove/player-actions/timepiece';
import { enableGhost, disableGhost } from '@podlove/player-actions/progress';

import { computed, onMounted, ref } from 'vue';
import { pathOr, path } from 'ramda';

const props = defineProps({
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
    default: undefined
  },
  buffer: {
    type: Array,
    default: () => []
  },
  quantiles: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  chapters: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['time', 'ghost', 'simulate']);

const thumbStyle = computed(() => ({
  left: relativePosition(props.time, props.duration)
}));

const ghostStyle = computed(() => ({
  left: relativePosition(props.ghost, props.duration)
}));

const thumbActive = ref(false);

const inputElement = ref(null);

onMounted(() => {
  new RangeTouch(inputElement, { watch: false });
});

// Methods
const onChange = (value: number) => emits('time', requestPlaytime(value));
const onInput = (value: number) => {
  emits('time', requestPlaytime(value));
  emits('ghost', disableGhost());
};

const extractValue = (input: Event): number => path(['target', 'value'], input);

const onMouseMove = (event: MouseEvent) => {
  const width = pathOr(0, ['target', 'clientWidth'], event);

  if ((event.offsetY < 13 && event.offsetY > 31) || event.offsetX < 0 || event.offsetX > width) {
    thumbActive.value = false;
    emits('ghost', disableGhost());
    return false;
  }

  thumbActive.value = true;

  emits('simulate', simulatePlaytime((props.duration * event.offsetX) / width));
  emits('ghost', enableGhost());

  return false;
};

const onMouseOut = () => {
  thumbActive.value = false;

  emits('ghost', disableGhost());
  emits('simulate', simulatePlaytime(props.time));

  return false;
};

const trackStyle = ([start, end]: [number, number]) => ({
  left: relativePosition(start, props.duration),
  width: relativePosition(end - start, props.duration)
});

const bufferStyle = ([start, end]: [number, number]) => ({
  left: relativePosition(start, props.duration),
  width: relativePosition(end - start, props.duration)
});

const chapterStyle = (chapter: { start: number; end: number }) => ({
  left: (chapter.start * 100) / props.duration + '%',
  width: ((chapter.end - chapter.start) * 100) / props.duration + '%'
});
</script>

<style lang="scss" scoped>
@import '../../styles/range';

.podlove-component--progress-bar {
  @include range($progress-height, $thumb-width-desktop, $thumb-width-desktop-hover);
  height: $progress-height;
  transition: opacity 150ms, height 300ms;

  .progress-range {
    top: calc(50% - calc($track-height / 2));
    height: $track-height;
    background-color: var(
      --podlove-component--progress-bar--progress-color,
      var(--podlove-components-text)
    );
  }

  .chapters-progress {
    background: transparent;
    height: 2px;
    top: calc(50% - 1px);
    border-right: 2px solid
      var(
        --podlove-component--progress-bar--chapters-separator-color,
        var(--podlove-components-highlight)
      );

    &.active {
      height: 4px;
      top: calc(50% - 2px);

      background: var(
        --podlove-component--progress-bar--chapters-background-color,
        var(--podlove-components-text)
      );
    }
  }

  .progress-track {
    top: calc(50% - calc($track-height / 2));
    height: $track-height;
    background-color: var(
      --podlove-component--progress-bar--track-background-color,
      var(--podlove-components-text)
    );
  }

  .progress-thumb {
    margin-left: calc(-1px - calc($thumb-size / 2));
    height: $thumb-size;
    border-radius: $thumb-size;
    top: calc(50% - calc($thumb-size / 2));
    width: $thumb-size;

    transition: left 150ms;
    background-color: var(
      --podlove-component--progress-bar--thumb-background-color,
      var(--podlove-components-text)
    );
    border-color: var(
      --podlove-component--progress-bar--thumb-border-color,
      var(--podlove-components-highlight)
    );

    &.active {
      width: $thumb-active-size;
      height: $thumb-active-size;
      border-radius: $thumb-active-size;
      top: calc(50% - calc($thumb-active-size / 2));
    }
  }

  .ghost-thumb {
    margin-left: calc(-1px - calc($thumb-size / 2));
    height: $thumb-size;
    border-radius: $thumb-size;
    top: calc(50% - calc($thumb-size / 2));
    width: $thumb-size;
    background-color: var(
      --podlove-component--progress-bar--ghost-background-color,
      var(--podlove-components-text)
    );
    border-color: var(
      --podlove-component--progress-bar--ghost-border-color,
      var(--podlove-components-highlight)
    );
  }

  .progress-buffer {
    display: block;
    opacity: 1;
    position: absolute;
    height: $track-height;
    top: calc(50% - calc($track-height / 2));
    left: 0;
    pointer-events: none;
    background-color: var(
      --podlove-component--progress-bar--buffer-background-color,
      var(--podlove-components-highlight)
    );
  }
}
</style>
