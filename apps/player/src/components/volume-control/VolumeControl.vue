<template>
  <div v-if="state.available" class="podlove-player--volume-control block">
    <div class="sr-only">
      <input
        type="number"
        :min="0"
        :max="100"
        :value="state.volume * 100"
        :step="5"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="state.volume * 100"
        :aria-valuetext="t(state.volumeLabel.key, state.volumeLabel.attr)"
        @input="setVolume(($event.target as HTMLInputElement).value as unknown as number)"
      />
    </div>

    <tooltip trigger="click" :placement="placement" :autohide="false" :showArrow="false">
      <button
        class="block cursor-pointer"
        data-test="volume-control"
        aria-hidden="true"
        @click="focus"
      >
        <speaker-0-icon v-if="state.icon === 'speaker-0'" />
        <speaker-25-icon v-if="state.icon === 'speaker-25'" />
        <speaker-50-icon v-if="state.icon === 'speaker-50'" />
        <speaker-75-icon v-if="state.icon === 'speaker-75'" />
      </button>

      <template v-slot:content>
        <div
          class="w-40 px-4 py-1 rounded shadow-lg"
        >
          <input-slider
            ref="volumeControl"
            class="mr-5"
            tabindex="0"
            data-test="volume-control--slider"
            :min="0"
            :max="100"
            :value="state.volume * 100"
            :step="1"
            @sliderInput="onInput"
          />
        </div>
      </template>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { InputSlider, Speaker0Icon, Speaker25Icon, Speaker50Icon, Speaker75Icon, Tooltip } from '@podlove/components';
import { setVolume } from '@podlove/player-actions/audio';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const volumeControl = ref<HTMLElement | null>(null);

defineProps({
  placement: {
    type: String,
    default: 'left',
    validator: (val: string) => ['left', 'right'].includes(val)
  }
});

const state = mapState({
  volume: select.audio.volume,
  icon: select.audio.icon,
  buttonTitle: select.accessibility.volumeButton,
  volumeLabel: select.accessibility.volumeControl,
  available: select.components.volumeControl
});

const dispatch = injectStore().dispatch;

const onInput = (val: number) => {
  dispatch(setVolume(val / 100));
};

const focus = () => {
  // setTimeout(() => {
  //   if (volumeControl.value) {
  //     volumeControl.value.querySelector('input').focus();
  //   }
  // }, 300);
};
</script>

<style lang="postcss" scoped>
.podlove-player--volume-control {
  --podlove-component--tooltip--color: var(--podlove-player--volume-control--color);
  --podlove-component--tooltip--background: var(--podlove-player--volume-control--background);
  --podlove-component--icon--color: var(--podlove-player--volume-control--icon-color);
  --podlove-component--input-slider--progress-color: var(--podlove-player--volume-control--progress-color);
  --podlove-component--input-slider--thumb-color: var(--podlove-player--volume-control--thumb-color);
  --podlove-component--input-slider--border-color: var(--podlove-player--volume-control--border-color);
}
</style>
