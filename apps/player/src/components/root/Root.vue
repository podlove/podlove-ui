<template>
  <div
    class="antialiased"
    :style="{ background: state.background, ...state.font }"
    data-test="root"
  >
    <slot />
    <font
      v-for="(font, index) in state.fonts"
      :key="index"
      :src="font.src"
      :name="font.name"
      :weight="font.weight"
    />
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import Font from '@podlove/components/font'
import select from 'store/selectors'

export default {
  components: { Font },
  setup() {
    return {
      state: mapState({
        background: select.theme.brandLightest,
        font: select.theme.fontRegular,
        fonts: select.theme.fonts,
        language: select.language
      })
    }
  },
  watch: {
    language() {
      this.$i18n.locale = this.state.language
    }
  },
  mounted() {
    this.$i18n.locale = this.state.language
  }
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.entry-enter-active,
.entry-leave-active {
  transition: height 300ms;

  * {
    transition: opacity 600ms;
  }
}
.entry-enter,
.entry-leave-to {
  height: 0;

  * {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 900ms;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.without-outline {
  a:focus,
  button:focus,
  input:focus,
  textarea:focus {
    outline: none;
  }
}
</style>
