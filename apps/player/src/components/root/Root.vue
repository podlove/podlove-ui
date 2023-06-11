<template>
  <div
    class="podlove-player antialiased"
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

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { Font } from '@podlove/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import select from '../../store/selectors/index.js';

const { locale } = useI18n({ useScope: 'global' });

const state = mapState({
  font: select.theme.fontRegular,
  fonts: select.theme.fonts,
  language: select.language,
  brandLightest: select.theme.brandLightest
});

const language = computed(() => state.language);

onMounted(() => {
  locale.value = language.value;
});

watch(language, (lang) => {
  locale.value = lang;
});
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.podlove-player {
  --podlove-player-background: v-bind('state.brandLightest');
}

.podlove-player {
  background: var(--podlove-player-background);
}

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
