<template>
  <timer
    v-if="!live || ghostTime"
    class="podlove-player--timer-live"
    role="timer"
    :color="state.color"
    :time="ghostTime ? ghostTime : time"
    :aria-label="t(state.a11y.key, state.a11y.attr)"
    tabindex="0"
    :remaining="true"
    data-test="timer-live"
  />
  <span v-else data-test="label-live">{{ t('LIVE') }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Timer } from '@podlove/components';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  playtime: select.playtime,
  livesync: select.livesync,
  ghost: select.ghost.time,
  a11y: select.accessibility.timerLive
});

const ghostTime = computed(() => (state.ghost ? state.livesync - state.ghost : null));
const time = computed(() => state.livesync - state.playtime);
const live = computed(() => time.value <= 5000);
</script>

<style lang="postcss" scoped>
.podlove-player--timer-live {
  color: var(--podlove-player--timer-live--color);
}
</style>
