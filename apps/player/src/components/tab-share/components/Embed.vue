<template>
  <div class="podlove-player--tab-share--embed" data-test="tab-share--embed">
    <h3 class="mb-2" :style="state.font">
      {{ t('SHARE.EMBED.TITLE') }}
    </h3>
    <div class="flex w-full">
      <input
        class="
          podlove-player--tab-share--embed--input
          block
          text-sm
          p-1
          rounded-sm
          mr-2
          w-full
          border
        "
        :aria-label="t(state.inputLabel.key, state.inputLabel.attr)"
        :disabled="true"
        :value="state.embedCode"
        data-test="tab-share--embed--input"
      />
      <tooltip
        :content="t('MESSAGES.COPIED')"
        trigger="click"
        :color="state.brandColor"
        :background="state.brandLightest"
        placement="top"
        @click="copyCode"
      >
        <button
          class="
            podlove-player--tab-share--embed--button
            block
            px-8
            py-2
            text-sm
            p-1
            rounded-sm
            mr-2
            w-full
            border
            font-bold
          "
          :title="t(state.copyLabel.key, state.copyLabel.attr)"
          :style="{
            ...state.font
          }"
        >
          <span aria-hidden="true">{{ t('SHARE.ACTIONS.COPY') }}</span>
        </button>
      </tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { Tooltip } from '@podlove/components';
import copy from '@podlove/utils/copy';

import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  embedSize: select.share.embedSize,
  embedCode: select.share.code,
  font: select.theme.fontBold,
  inputLabel: select.accessibility.embedCode,
  copyLabel: select.accessibility.copyEmbedLink
});

const copyCode = () => {
  copy(state.embedCode);
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-share--embed--input {
  color: var(--podlove-player--tab-share--embed--input--color);
  background: var(--podlove-player--tab-share--embed--input--background);
  border-color: var(--podlove-player--tab-share--embed--input--border);
}

.podlove-player--tab-share--embed--button {
  color: var(--podlove-player--tab-share--embed--button--color);
  background: var(--podlove-player--tab-share--embed--button--background);
  border-color: var(--podlove-player--tab-share--embed--button--border);
}
</style>
