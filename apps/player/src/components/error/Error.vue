<template>
  <div
    v-if="state.active"
    id="error"
    class="fixed flex items-center justify-center w-full h-full inset-0"
    :style="{ background: state.brandLightest }"
    data-test="error"
  >
    <div class="p-6 text-center">
      <h3
        v-if="state.title"
        class="text-2xl mb-5"
        :style="{ font: state.headline, color: state.contrast }"
        data-test="error--title"
      >
        {{ $t(state.title) }}
      </h3>
      <p
        v-if="state.message"
        class="max-w-xl mb-5"
        data-test="error--message"
        :style="{ color: state.contrast }"
      >
        {{ $t(state.message) }}
      </p>
      <button
        v-if="state.retry"
        class="px-5 py-2 rounded-sm"
        :style="{ color: state.alt, background: state.brandDark, ...state.headline }"
        data-test="error--retry"
        @click.native="retryAction"
      >
        {{ $t('PLAYER.RETRY') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import select from 'store/selectors'

export default {
  setup() {
    return {
      state: mapState({
        active: select.error.active,
        title: select.error.title,
        message: select.error.message,
        retry: select.error.retry,
        headline: select.theme.fontBold,
        brandDark: select.theme.brandDark,
        alt: select.theme.alt,
        brandLightest: select.theme.brandLightest,
        contrast: select.theme.contrast
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    retryAction() {
      this.retry && dispatch({ type: this.retry })
    }
  }
}
</script>
