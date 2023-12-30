<script lang="ts" setup>
import { requestPlay, requestPause, requestRestart } from '@podlove/player-actions/play';
import { computed } from 'vue';

import Play from './states/Play.vue';
import Pause from './states/Pause.vue';
import Loading from './states/Loading.vue';
import Restart from './states/Restart.vue';

const types: { [key: string]: any } = {
  play: Play,
  pause: Pause,
  loading: Loading,
  restart: Restart
}

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (val: string) => ['play', 'pause', 'loading', 'restart'].includes(val)
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 50
  }
});

const emit = defineEmits(['play', 'pause', 'restart']);

const clickHandler = () => {
  switch (props.type) {
    case 'play':
      emit('play', requestPlay());
      break;
    case 'pause':
      emit('pause', requestPause());
      break;
    case 'restart':
      emit('restart', requestRestart());
      break;
  }
};

const styleSize = computed(() => `${props.size}px`);
const maxWidth = computed(() => props.label && props.type !== 'loading' ? '150px' : `${props.size}px`);
</script>

<template>
  <button
    :id="`play-button--${type}`"
    ref="playbutton"
    class="podlove-component-play-button"
    @click="clickHandler()"
  >
    <div class="play-button--wrapper flex items-center justify-center overflow-hidden rounded-full">
      <transition name="component" mode="out-in">
        <component
          :is="types[type]"
          :id="`play-button--${type}`"
          ref="component"
          class="component py-0"
          :size="size / 2"
          :class="{
            'pl-4 pr-5': label && type !== 'loading'
          }"
        >
          <span
            v-if="label"
            data-test="play-button--label"
            class="play-button--label truncate ml-2 text-base font-normal font-variant-numeric"
          >
            {{ label }}
          </span>
        </component>
      </transition>
    </div>
  </button>
</template>

<style lang="postcss" scoped>
.podlove-component-play-button {
  --podlove-component--icon--color: var(
    --podlove-component--play-button--text-color,
    var(--podlove-components-text)
  );
}

.podlove-component-play-button .play-button--wrapper {
  background-color: var(
    --podlove-component--play-button--background,
    var(--podlove-components-background)
  );
  height: v-bind('styleSize');
  min-width: v-bind('styleSize');
  border-radius: calc(v-bind('styleSize') / 2);
  max-width: v-bind('maxWidth');
}

.podlove-component-play-button .play-button--label {
  color: var(--podlove-component--play-button--text-color, var(--podlove-components-text));
}

.component-enter-active,
.component-leave-active {
  transition: opacity 300ms ease;
}

.component-enter,
.component-leave-to {
  opacity: 0;
}
</style>
