<template>
  <div data-test="tab-share--embed">
    <h3 class="mb-2" :style="state.font">
      {{ $t('SHARE.EMBED.TITLE') }}
    </h3>
    <div class="flex w-full">
      <input
        class="block text-sm p-1 rounded-sm mr-2 w-full border"
        :aria-label="$t(state.inputLabel.key, state.inputLabel.attr)"
        :disabled="true"
        :value="state.embedCode"
        :style="{
          color: state.contrast,
          background: state.background,
          'border-color': state.brandColor
        }"
        data-test="tab-share--embed--input"
      />
      <tooltip
        :content="$t('MESSAGES.COPIED')"
        trigger="click"
        :color="state.brandColor"
        :background="state.brandLightest"
        placement="top"
        @click="copyCode"
      >
        <button
          class="block px-8 py-2 text-sm p-1 rounded-sm mr-2 w-full border"
          :title="$t(copyLabel.key, copyLabel.attr)"
          :style="{
            color: state.brandColor,
            background: state.background,
            ...state.font,
            'border-color': state.brandColor
          }"
        >
          <span aria-hidden="true">{{ $t('SHARE.ACTIONS.COPY') }}</span>
        </button>
      </tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import Tooltip from '@podlove/components/tooltip'
import { selectEmbedSize } from '@podlove/player-actions/embed'
import copy from 'copy-to-clipboard'

import select from 'store/selectors'

export default {
  components: {
    Tooltip
  },
  setup() {
    return {
      state: mapState({
        embedSize: select.share.embedSize,
        embedCode: select.share.code,
        font: select.theme.fontBold,
        brandColor: select.theme.brandDark,
        brandLightest: select.theme.brandLightest,
        contrast: select.theme.contrast,
        background: select.theme.alt,
        inputLabel: select.accessibility.embedCode,
        copyLabel: select.accessibility.copyEmbedLink
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    setSize(val) {
      this.dispatch(selectEmbedSize(val))
    },

    copyCode() {
      copy(this.state.embedCode)
    }
  }
}
</script>
