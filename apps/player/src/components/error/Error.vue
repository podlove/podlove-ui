<template>
  <div
    v-if="state.active"
    id="error"
    class="podlove-player--error fixed flex items-center justify-center w-full h-full inset-0"
    data-test="error"
  >
    <div class="p-6 text-center">
      <h3
        v-if="state.title"
        class="podlove-player--error--title text-2xl mb-5 font-bold"
        data-test="error--title"
      >
        {{ t(state.title) }}
      </h3>
      <p
        v-if="state.message"
        class="podlove-player--error--message max-w-xl mb-5"
        data-test="error--message"
      >
        {{ t(state.message) }}
      </p>
      <button
        v-if="state.retry"
        class="podlove-player--error--retry-button px-5 py-2 rounded-sm"
        :style="{ ...state.headline }"
        data-test="error--retry"
        @click="retryAction"
      >
        {{ t('PLAYER.RETRY') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  active: select.error.active,
  title: select.error.title,
  message: select.error.message,
  retry: select.error.retry
});

const dispatch = injectStore().dispatch;

const retryAction = () => {
  state.retry && dispatch({ type: state.retry });
};
</script>

<style lang="postcss" scoped>
.podlove-player--error {
  background: var(--podlove-player--error--background);
}

.podlove-player--error--title {
  color: var(--podlove-player--error--title-color);
}

.podlove-player--error--message {
  color: var(--podlove-player--error--message-color);
}

.podlove-player--error--retry-button {
  color: var(--podlove-player--error--retry-button-color);
  background: var(--podlove-player--error--retry-button-background);
}
</style>
