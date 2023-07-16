<template>
  <play-button
    class="podlove-player--play-button"
    :class="{ hover}"
    v-if="button.type"
    :type="button.type"
    :title="button.a11y"
    :size="size"
    :label="button.label"
    data-test="play-button"
    @play="dispatch"
    @pause="dispatch"
    @restart="dispatch"
    @mouseover="mouseOver()"
    @mouseleave="mouseLeave()"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { toHumanTime } from '@podlove/utils/time';
import { mapState, injectStore } from 'redux-vuex';
import { PlayButton } from '@podlove/components';
import { useI18n } from 'vue-i18n';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  size: {
    type: Number,
    default: 50
  },
  variant: {
    type: String,
    validate: (val) => ['details', 'simple'].includes(val),
    default: 'details'
  }
});

const hover = ref(false);

const state = mapState({
  playButton: select.components.playButton,
  duration: select.duration,
  playtime: select.playtime,
  pauseA11y: select.accessibility.playButtonPause,
  durationA11y: select.accessibility.playButtonDuration,
  replayA11y: select.accessibility.playButtonReplay,
  playA11y: select.accessibility.playButtonPlay,
  errorA11y: select.accessibility.playButtonError
});

const dispatch = injectStore().dispatch;

const button = computed(() => {
  switch (state.playButton) {
    case 'paused':
      return {
        type: 'play',
        a11y: t(state.playA11y.key, state.playA11y.attr),
        width: '50px'
      };
    default:
    case 'duration':
      return {
        type: 'play',
        a11y: t(state.durationA11y.key, state.durationA11y.attr),
        label:
          props.variant === 'details'
            ? props.label || toHumanTime(state.playtime > 0 ? state.playtime : state.duration)
            : null
      };
    case 'remaining':
      return {
        type: 'play',
        label: props.variant === 'details' ? toHumanTime(state.playtime) : null
      };
    case 'replay':
      return {
        type: 'restart',
        a11y: t(state.replayA11y.key, state.replayA11y.attr),
        label: t('PLAYER.REPLAY')
      };
    case 'loading':
      return {
        type: 'loading'
      };
    case 'playing':
      return {
        type: 'pause',
        a11y: t(state.pauseA11y.key, state.pauseA11y.attr)
      };
    case 'error':
      return {
        type: 'restart',
        a11y: t(state.errorA11y.key, state.errorA11y.attr)
      };
    case 'retry':
      return {
        type: 'restart',
        label: t('PLAYER.RETRY')
      };
    case 'end':
      return {
        type: 'restart'
      };
  }
});

const mouseOver = () => {
  hover.value = true;
};

const mouseLeave = () => {
  hover.value = false;
};
</script>

<style lang="postcss" scoped>
.podlove-player--play-button {
  --podlove-component--play-button--text-color: var(--podlove-player--play-button--color);
  --podlove-component--play-button--background: var(--podlove-player--play-button--background);
}

.podlove-player--play-button.hover {
  --podlove-component--play-button--text-color: var(--podlove-player--play-button--color-hover);
}
</style>
